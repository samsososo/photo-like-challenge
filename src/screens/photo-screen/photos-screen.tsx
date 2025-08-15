import {PhotosHeader} from '@/components/photos-header/photos-header';
import {CommonState} from '@/interface/common-state-interface';
import {getAllPhoto} from '@/redux/actions/get-all-photo-action';
import {useNetworkStatus} from '@/services/network-status-service';
import {
  cachePhotos,
  cleanOldStorageKeys,
  clearAllData,
  debugStorage,
  getCacheStats,
  getCachedPhotos,
  getPhotoLikeStatus,
} from '@/services/photo-cache-service';
import {Photo} from '@/types';
import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
  useRef,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {PhotoCard} from '../../components/photo-card/photo-card';
import {styles} from './styles';

const MemoizedPhotoCard = React.memo(PhotoCard);

export const PhotosScreen: FunctionComponent = React.memo(() => {
  const dispatch = useDispatch();
  const {photos, currentPage, hasMore, isLoading, apiStatus} = useSelector(
    (state: CommonState) => state.getAllPhotoReducers,
  );
  const [refreshing, setRefreshing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [storageStats, setStorageStats] = useState<{
    totalPhotos: number;
    likedPhotos: number;
    isValid: boolean;
    version: string;
    isOffline: boolean;
  } | null>(null);
  const [syncedPhotos, setSyncedPhotos] = useState<Photo[]>([]);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [hasApiFailed, setHasApiFailed] = useState(false);
  const initializationRef = useRef(false);

  const networkStatus = useNetworkStatus();

  const initializeApp = useCallback(async () => {
    if (initializationRef.current) return;
    initializationRef.current = true;

    try {
      await cleanOldStorageKeys();
      const stats = await getCacheStats();
      setStorageStats(stats);
      setIsOfflineMode(stats.isOffline);

      const cachedPhotos = await getCachedPhotos();
      if (cachedPhotos.length > 0) {
        setSyncedPhotos(cachedPhotos);
        console.log(`Loaded ${cachedPhotos.length} cached photos`);
      }

      if (!stats.isOffline && cachedPhotos.length < 8 && !hasApiFailed) {
        dispatch(getAllPhoto(1, 8));
      }

      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing app:', error);
      setIsInitialized(true);
    }
  }, [dispatch, hasApiFailed]);

  const updateStats = useCallback(async () => {
    if (isInitialized) {
      const stats = await getCacheStats();
      setStorageStats(stats);
    }
  }, [isInitialized]);

  const updateOfflineMode = useCallback(
    (isConnected: boolean, isInternetReachable: boolean) => {
      setIsOfflineMode(!isConnected || !isInternetReachable);
    },
    [],
  );

  const processPhotos = useCallback(
    async (photos: Photo[], syncPhotosFn: Function) => {
      if (
        photos.length > 0 &&
        isInitialized &&
        !isOfflineMode &&
        !hasApiFailed
      ) {
        try {
          await syncPhotosFn(photos);
          await cachePhotos(photos);
          await updateStats();
          await debugStorage();
        } catch (error) {}
      }
    },
    [isInitialized, isOfflineMode, hasApiFailed, updateStats],
  );

  const renderItem = useCallback(
    ({item}: {item: Photo}) => <MemoizedPhotoCard photo={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Photo) => item.id, []);

  const displayPhotos = useMemo(
    () => (syncedPhotos.length > 0 ? syncedPhotos : photos),
    [syncedPhotos, photos],
  );

  const loadMorePhotos = useCallback(() => {
    if (hasMore && !isLoading && !isOfflineMode && !hasApiFailed) {
      const nextPage = currentPage + 1;
      dispatch(getAllPhoto(nextPage, 8));
    }
  }, [hasMore, isLoading, currentPage, dispatch, isOfflineMode, hasApiFailed]);

  const renderFooter = useCallback(() => {
    if (isLoading && !isOfflineMode && !hasApiFailed) {
      return (
        <View style={styles.loadingFooter}>
          <ActivityIndicator size="small" color="#0066cc" />
          <Text style={styles.loadingText}>Loading more photos...</Text>
        </View>
      );
    }

    if (!hasMore && photos.length > 0 && !isOfflineMode && !hasApiFailed) {
      return (
        <View style={styles.noMoreFooter}>
          <Text style={styles.noMoreText}>No More Photos</Text>
        </View>
      );
    }

    if (isOfflineMode && syncedPhotos.length > 0) {
      return (
        <View style={styles.offlineFooter}>
          <Text style={styles.offlineText}>
            Offline Mode - Showing Cached Photos
          </Text>
          <Text style={styles.cacheInfoText}>
            {storageStats?.totalPhotos || 0} photos available offline
          </Text>
        </View>
      );
    }

    if (hasApiFailed && displayPhotos.length === 0) {
      return (
        <View style={styles.errorFooter}>
          <Text style={styles.errorText}>API Error - No Data Available</Text>
          <Text style={styles.errorSubtext}>
            Please check your connection and try again
          </Text>
        </View>
      );
    }

    return null;
  }, [
    isLoading,
    hasMore,
    photos.length,
    isOfflineMode,
    syncedPhotos.length,
    storageStats?.totalPhotos,
    hasApiFailed,
    displayPhotos.length,
  ]);

  const onRefresh = useCallback(async () => {
    if (isOfflineMode) {
      const stats = await getCacheStats();
      setStorageStats(stats);
      return;
    }

    if (hasApiFailed) {
      setHasApiFailed(false);
      dispatch(getAllPhoto(1, 8));
      return;
    }

    setRefreshing(true);
    dispatch(getAllPhoto(1, 8));
    setRefreshing(false);
  }, [dispatch, isOfflineMode, hasApiFailed, setStorageStats]);

  const syncPhotosWithLikes = useCallback(
    async (photoList: Photo[]) => {
      try {
        const photosWithLikes = await Promise.all(
          photoList.map(async photo => {
            const isLiked = await getPhotoLikeStatus(photo.id, photo.author);
            return {...photo, isLiked};
          }),
        );

        setSyncedPhotos(photosWithLikes);
      } catch (error) {
        setSyncedPhotos(photoList);
      }
    },
    [setSyncedPhotos],
  );

  const handleDebugStorage = useCallback(async () => {
    try {
      await debugStorage();
    } catch (error) {}
  }, []);

  const handleClearCache = useCallback(async () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to clear all data? This will remove all cached photos and reset all like statuses.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearAllData();
              setSyncedPhotos([]);
              setStorageStats(null);
              setHasApiFailed(false);
              if (!isOfflineMode) {
                dispatch(getAllPhoto(1, 8));
              }
            } catch (error) {}
          },
        },
      ],
    );
  }, [
    dispatch,
    isOfflineMode,
    setSyncedPhotos,
    setStorageStats,
    setHasApiFailed,
  ]);

  const loadingScreen = useMemo(
    () => (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Photos</Text>
          <Text style={styles.subtitle}>Initializing...</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Loading photos...</Text>
        </View>
      </View>
    ),
    [],
  );

  const handleNetworkChange = useCallback(() => {
    updateOfflineMode(
      networkStatus.isConnected,
      networkStatus.isInternetReachable,
    );
  }, [
    networkStatus.isConnected,
    networkStatus.isInternetReachable,
    updateOfflineMode,
  ]);

  const handlePhotosChange = useCallback(() => {
    if (photos.length > 0) {
      processPhotos(photos, syncPhotosWithLikes);
    }
  }, [photos, processPhotos, syncPhotosWithLikes]);

  const handleOfflineModeChange = useCallback(() => {
    updateStats();
  }, [updateStats]);

  const handleLayout = useCallback(() => {
    if (isInitialized) {
      handleNetworkChange();
      handlePhotosChange();
      handleOfflineModeChange();
    }
  }, [
    isInitialized,
    handleNetworkChange,
    handlePhotosChange,
    handleOfflineModeChange,
  ]);

  const mainContent = useMemo(() => {
    if (!isInitialized) {
      return <View style={styles.container}>{loadingScreen}</View>;
    }

    return (
      <View style={styles.container}>
        <PhotosHeader
          totalPhotos={displayPhotos.length}
          likedPhotos={storageStats?.likedPhotos || 0}
          cachedPhotos={storageStats?.totalPhotos || 0}
          isOffline={isOfflineMode}
          onDebug={handleDebugStorage}
          onClearAll={handleClearCache}
          onRefresh={onRefresh}
        />
        <FlatList
          data={displayPhotos}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          onEndReached={loadMorePhotos}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#0066cc']}
              tintColor="#0066cc"
            />
          }
          removeClippedSubviews={true}
          maxToRenderPerBatch={8}
          windowSize={10}
          initialNumToRender={8}
          updateCellsBatchingPeriod={50}
          onLayout={handleLayout}
        />
      </View>
    );
  }, [
    isInitialized,
    loadingScreen,
    displayPhotos,
    storageStats,
    isOfflineMode,
    handleDebugStorage,
    handleClearCache,
    onRefresh,
    renderItem,
    keyExtractor,
    loadMorePhotos,
    renderFooter,
    refreshing,
    handleLayout,
  ]);

  const initEffect = useMemo(() => {
    if (!isInitialized && !initializationRef.current) {
      initializeApp();
    }
    return null;
  }, [isInitialized, initializeApp]);

  const errorEffect = useMemo(() => {
    if (apiStatus === 'FAILURE' && !hasApiFailed) {
      setHasApiFailed(true);
      console.log('API failed, stopping retries and showing No Data');
    }
    return null;
  }, [apiStatus, hasApiFailed]);

  return (
    <>
      {initEffect}
      {errorEffect}
      {mainContent}
    </>
  );
});
