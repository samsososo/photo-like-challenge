import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import {PhotoCard} from '../../components/photo-card/photo-card';
import {styles} from './styles';
import {Photo} from '@/types';
import {getAllPhoto} from '@/redux/actions/get-all-photo-action';
import {useDispatch, useSelector} from 'react-redux';
import {CommonState} from '@/interface/common-state-interface';
import {
  getStorageStats,
  getCachedPhotos,
  getPhotoLikeStatus,
  cachePhotos,
  debugStorage,
  clearCache,
  clearAllData,
} from '@/services/photo-cache-service';
import {PhotosHeader} from '@/components/photos-header/photos-header';

export const PhotosScreen: FunctionComponent = () => {
  const dispatch = useDispatch();
  const {photos, currentPage, hasMore, isLoading} = useSelector(
    (state: CommonState) => state.getAllPhotoReducers,
  );
  const [refreshing, setRefreshing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [storageStats, setStorageStats] = useState<{
    totalPhotos: number;
    likedPhotos: number;
  } | null>(null);
  const [syncedPhotos, setSyncedPhotos] = useState<Photo[]>([]);

  const renderItem = ({item}: {item: Photo}) => <PhotoCard photo={item} />;

  const keyExtractor = (item: Photo) => item.id;

  const loadMorePhotos = useCallback(() => {
    if (hasMore && !isLoading) {
      const nextPage = currentPage + 1;
      dispatch(getAllPhoto(nextPage, 8));
    }
  }, [hasMore, isLoading, currentPage, dispatch]);

  const renderFooter = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingFooter}>
          <ActivityIndicator size="small" color="#0066cc" />
          <Text style={styles.loadingText}>Loading more photos...</Text>
        </View>
      );
    }

    if (!hasMore && photos.length > 0) {
      return (
        <View style={styles.noMoreFooter}>
          <Text style={styles.noMoreText}>No More Photos</Text>
        </View>
      );
    }

    return null;
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(getAllPhoto(1, 8));
    setRefreshing(false);
  }, [dispatch]);

  const syncPhotosWithLikes = useCallback(async (photoList: Photo[]) => {
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
  }, []);

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
              dispatch(getAllPhoto(1, 8));
            } catch (error) {}
          },
        },
      ],
    );
  }, [dispatch]);

  const handleRefreshData = useCallback(async () => {
    Alert.alert(
      'Refresh Data',
      'Are you sure you want to refresh all photo data? This will fetch the latest photos from the server.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Refresh',
          style: 'default',
          onPress: async () => {
            try {
              await clearCache();
              setSyncedPhotos([]);
              setStorageStats(null);
              dispatch(getAllPhoto(1, 8));
            } catch (error) {}
          },
        },
      ],
    );
  }, [dispatch]);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const stats = await getStorageStats();
        setStorageStats(stats);
        const cachedPhotos = await getCachedPhotos();
        if (cachedPhotos.length > 0) {
          setSyncedPhotos(cachedPhotos);
        }
        dispatch(getAllPhoto(1, 8));
        setIsInitialized(true);
      } catch (error) {
        dispatch(getAllPhoto(1, 8));
        setIsInitialized(true);
      }
    };

    if (!isInitialized) {
      initializeApp();
    }
  }, [dispatch, isInitialized]);

  useEffect(() => {
    if (photos.length > 0 && isInitialized) {
      const processPhotos = async () => {
        try {
          await syncPhotosWithLikes(photos);
          await cachePhotos(photos);
          const stats = await getStorageStats();
          setStorageStats(stats);
          await handleDebugStorage();
        } catch (error) {}
      };
      processPhotos();
    }
  }, [photos, isInitialized, syncPhotosWithLikes, handleDebugStorage]);

  if (!isInitialized) {
    return (
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
    );
  }

  const displayPhotos = syncedPhotos.length > 0 ? syncedPhotos : photos;

  return (
    <View style={styles.container}>
      <PhotosHeader
        totalPhotos={displayPhotos.length}
        likedPhotos={storageStats?.likedPhotos || 0}
        cachedPhotos={storageStats?.totalPhotos || 0}
        onDebug={handleDebugStorage}
        onClearAll={handleClearCache}
        onRefresh={handleRefreshData}
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
      />
    </View>
  );
};
