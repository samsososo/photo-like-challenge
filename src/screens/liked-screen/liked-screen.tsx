import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import config from '@/config/ui-config.json';
import {getCachedPhotos, getPhotoLikeStatus} from '@/services/photo-cache-service';

import {styles} from './styles';
import {Photo} from '@/types';
import {PhotoCard} from '@/components/photo-card/photo-card';

export const LikedScreen = () => {
  const [likedPhotos, setLikedPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadLikedPhotos = async () => {
    try {
      setIsLoading(true);
      const cachedPhotos = await getCachedPhotos();
      
      const likedOnly: Photo[] = [];
      
      for (const photo of cachedPhotos) {
        const isLiked = await getPhotoLikeStatus(photo.id, photo.author, photo.url, photo.width, photo.height);
        if (isLiked) {
          likedOnly.push({...photo, isLiked: true});
        }
      }

      setLikedPhotos(likedOnly);
    } catch (error) {
      console.error('Error loading liked photos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (config.likedScreen.enabled) {
      loadLikedPhotos();
    }
  }, [config.likedScreen.enabled]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadLikedPhotos();
    setRefreshing(false);
  };

  const renderPhoto = ({item}: {item: Photo}) => {
    return <PhotoCard photo={item} />;
  };

  const renderEmpty = () => {
    if (isLoading) return null;
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          {config.likedScreen.title}
        </Text>
        <Text style={styles.emptyMessage}>
          {config.likedScreen.message}
        </Text>
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>{config.likedScreen.title}</Text>
      <Text style={styles.subtitle}>
        {likedPhotos.length} {likedPhotos.length === 1 ? 'photo' : 'photos'}
      </Text>
    </View>
  );

  if (!config.likedScreen.enabled) {
    return (
      <View style={styles.disabledContainer}>
        <Text style={styles.disabledText}>Liked Screen is disabled</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.loadingText}>Loading liked photos...</Text>
        </View>
      ) : (
        <FlatList
          data={likedPhotos}
          renderItem={renderPhoto}
          keyExtractor={item => `${item.id}-${item.author}`}
          ListEmptyComponent={renderEmpty}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#3b82f6"
              title="Pull to refresh"
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={likedPhotos.length === 0 ? styles.emptyList : undefined}
        />
      )}
    </View>
  );
};
