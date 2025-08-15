import React, {FunctionComponent, useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

type PhotosHeaderProps = {
  totalPhotos: number;
  likedPhotos?: number;
  cachedPhotos?: number;
  isOffline?: boolean;
  onDebug: () => void;
  onClearAll: () => void;
  onRefresh: () => void;
};

export const PhotosHeader: FunctionComponent<PhotosHeaderProps> = React.memo(
  ({
    totalPhotos,
    likedPhotos = 0,
    cachedPhotos = 0,
    isOffline = false,
    onDebug,
    onClearAll,
    onRefresh,
  }) => {
    const subtitleText = useMemo(
      () => `Total: ${totalPhotos} photos`,
      [totalPhotos],
    );

    const storageStatsText = useMemo(
      () => `Liked: ${likedPhotos} | Cached: ${cachedPhotos}`,
      [likedPhotos, cachedPhotos],
    );

    const offlineStatusText = useMemo(
      () => (isOffline ? 'Offline Mode' : 'Online'),
      [isOffline],
    );

    return (
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Photos</Text>
          <View style={[styles.statusBadge, isOffline && styles.offlineBadge]}>
            <Text
              style={[
                styles.statusText,
                isOffline && styles.offlineStatusText,
              ]}>
              {offlineStatusText}
            </Text>
          </View>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.subtitle}>{subtitleText}</Text>
          <Text style={styles.storageStats}>{storageStatsText}</Text>
          {isOffline && (
            <Text style={styles.offlineInfo}>
              Working offline with cached data
            </Text>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onDebug}
              style={styles.debugButton}
              activeOpacity={0.7}>
              <Text style={styles.debugButtonText}>Debug</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClearAll}
              style={styles.clearCacheButton}
              activeOpacity={0.7}>
              <Text style={styles.clearCacheButtonText}>Clear Cache</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onRefresh}
              style={[
                styles.refreshButton,
                isOffline && styles.offlineRefreshButton,
              ]}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.refreshButtonText,
                  isOffline && styles.offlineRefreshText,
                ]}>
                {isOffline ? 'Refresh Cache' : 'Refresh'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  },
);
