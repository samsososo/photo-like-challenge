import React, {FunctionComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

type PhotosHeaderProps = {
  totalPhotos: number;
  likedPhotos?: number;
  cachedPhotos?: number;
  onDebug: () => void;
  onClearAll: () => void;
  onRefresh: () => void;
};

export const PhotosHeader: FunctionComponent<PhotosHeaderProps> = ({
  totalPhotos,
  likedPhotos = 0,
  cachedPhotos = 0,
  onDebug,
  onClearAll,
  onRefresh,
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Photos</Text>
      <View style={styles.headerInfo}>
        <Text style={styles.subtitle}>Total: {totalPhotos} photos</Text>
        <Text style={styles.storageStats}>
          Liked: {likedPhotos} | Cached: {cachedPhotos}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onDebug} style={styles.debugButton}>
            <Text style={styles.debugButtonText}>Debug</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onClearAll}
            style={styles.clearCacheButton}>
            <Text style={styles.clearCacheButtonText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
