import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useImageState } from '@/redux/hooks/useImageState';
import { PhotoCard } from '@/components/photo-card/photo-card';

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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Redux Toolkit + Double Tap Demo</Text>
      
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

      <Text style={styles.instructions}>
        💡 Double-tap on any photo to like/dislike it!
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
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  instructions: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#007AFF',
    fontWeight: '600',
  },
  photoList: {
    marginTop: 20,
  },
});
