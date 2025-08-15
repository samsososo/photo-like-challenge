import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useImageState } from '@/redux/hooks/useImageState';

export const ExampleUsage: React.FC = () => {
  const { 
    photos, 
    isLoading, 
    error, 
    currentPage, 
    hasMore,
    actions 
  } = useImageState();

  const handleFetchPhotos = () => {
    actions.fetchAllPhotos(1, 8);
  };

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      const nextPage = currentPage + 1;
      actions.fetchAllPhotos(nextPage, 8);
    }
  };

  const handleToggleLike = (photoId: string, author: string, currentLikeStatus: boolean) => {
    actions.togglePhotoLike(photoId, author, !currentLikeStatus);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redux Toolkit Example</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleFetchPhotos}>
        <Text style={styles.buttonText}>
          {isLoading ? 'Loading...' : 'Fetch Photos'}
        </Text>
      </TouchableOpacity>

      {error && (
        <Text style={styles.error}>Error: {error}</Text>
      )}

      <Text style={styles.info}>
        Current Page: {currentPage} | 
        Photos: {photos.length} | 
        Has More: {hasMore ? 'Yes' : 'No'}
      </Text>

      {photos.length > 0 && (
        <TouchableOpacity 
          style={[styles.button, !hasMore && styles.disabledButton]} 
          onPress={handleLoadMore}
          disabled={!hasMore || isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Loading...' : 'Load More'}
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.photoList}>
        {photos.slice(0, 3).map((photo) => (
          <View key={photo.id} style={styles.photoItem}>
            <Text style={styles.photoText}>
              {photo.author} - {photo.width}x{photo.height}
            </Text>
            <TouchableOpacity
              style={[styles.likeButton, photo.isLiked && styles.likedButton]}
              onPress={() => handleToggleLike(photo.id, photo.author, photo.isLiked || false)}
            >
              <Text style={styles.likeButtonText}>
                {photo.isLiked ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  info: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  photoList: {
    marginTop: 20,
  },
  photoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  photoText: {
    fontSize: 14,
    flex: 1,
  },
  likeButton: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  likedButton: {
    backgroundColor: '#ff6b6b',
    borderColor: '#ff6b6b',
  },
  likeButtonText: {
    fontSize: 16,
  },
});
