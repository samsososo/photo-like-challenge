import AsyncStorage from '@react-native-async-storage/async-storage';
import {Photo} from '@/types';

const STORAGE_KEYS = {
  LIKED_PHOTOS: 'liked_photos',
  PHOTOS_CACHE: 'photos_cache',
};

export const generatePhotoKey = (photoId: string, author: string): string => {
  return `${photoId}_${author}`;
};

export const parsePhotoKey = (photoKey: string): { photoId: string; author: string } | null => {
  const parts = photoKey.split('_');
  if (parts.length >= 2) {
    return {
      photoId: parts[0],
      author: parts.slice(1).join('_')
    };
  }
  return null;
};

export const getPhotoLikeStatus = async (photoId: string, author: string): Promise<boolean> => {
  try {
    const likedPhotos = await AsyncStorage.getItem(STORAGE_KEYS.LIKED_PHOTOS);
    if (likedPhotos) {
      const likedPhotoKeys: string[] = JSON.parse(likedPhotos);
      const photoKey = generatePhotoKey(photoId, author);
      return likedPhotoKeys.includes(photoKey);
    }
    return false;
  } catch (error) {
    console.error('Error getting photo like status:', error);
    return false;
  }
};

export const togglePhotoLike = async (photoId: string, author: string): Promise<boolean> => {
  try {
    console.log(`Toggling like for photo ${photoId} (${author})`);
    
    const likedPhotos = await AsyncStorage.getItem(STORAGE_KEYS.LIKED_PHOTOS);
    console.log('Current liked photos from storage:', likedPhotos);
    
    const likedPhotoKeys: string[] = likedPhotos ? JSON.parse(likedPhotos) : [];
    console.log('Parsed liked photo keys:', likedPhotoKeys);
    
    const photoKey = generatePhotoKey(photoId, author);
    console.log('Generated photo key:', photoKey);
    
    let newIsLiked: boolean;
    
    if (likedPhotoKeys.includes(photoKey)) {
      console.log('Photo is currently liked, removing like');
      const newLikedPhotoKeys = likedPhotoKeys.filter(key => key !== photoKey);
      await AsyncStorage.setItem(STORAGE_KEYS.LIKED_PHOTOS, JSON.stringify(newLikedPhotoKeys));
      newIsLiked = false;
    } else {
      console.log('Photo is not liked, adding like');
      const newLikedPhotoKeys = [...likedPhotoKeys, photoKey];
      await AsyncStorage.setItem(STORAGE_KEYS.LIKED_PHOTOS, JSON.stringify(newLikedPhotoKeys));
      newIsLiked = true;
    }
    
    console.log(`Photo ${photoId} (${author}) like status updated to: ${newIsLiked}`);
    
    const updatedLikedPhotos = await AsyncStorage.getItem(STORAGE_KEYS.LIKED_PHOTOS);
    console.log('Updated liked photos in storage:', updatedLikedPhotos);
    
    return newIsLiked;
  } catch (error) {
    console.error('Error toggling photo like:', error);
    throw error;
  }
};

export const getLikedPhotoInfo = async (): Promise<Array<{ photoId: string; author: string }>> => {
  try {
    const likedPhotos = await AsyncStorage.getItem(STORAGE_KEYS.LIKED_PHOTOS);
    if (likedPhotos) {
      const likedPhotoKeys: string[] = JSON.parse(likedPhotos);
      const photoInfo: Array<{ photoId: string; author: string }> = [];
      
      for (const photoKey of likedPhotoKeys) {
        const parsed = parsePhotoKey(photoKey);
        if (parsed) {
          photoInfo.push(parsed);
        }
      }
      
      return photoInfo;
    }
    return [];
  } catch (error) {
    console.error('Error getting liked photo info:', error);
    return [];
  }
};

export const getLikedPhotoIds = async (): Promise<string[]> => {
  try {
    const photoInfo = await getLikedPhotoInfo();
    return photoInfo.map(info => info.photoId);
  } catch (error) {
    console.error('Error getting liked photo IDs:', error);
    return [];
  }
};

export const cachePhotos = async (photos: Photo[]): Promise<void> => {
  try {
    const existingLikedPhotoInfo = await getLikedPhotoInfo();

    const photosWithLikes = photos.map(photo => {
      const isLiked = existingLikedPhotoInfo.some(
        likedInfo => likedInfo.photoId === photo.id && likedInfo.author === photo.author
      );
      return { ...photo, isLiked };
    });

    await AsyncStorage.setItem(STORAGE_KEYS.PHOTOS_CACHE, JSON.stringify(photosWithLikes));

    console.log(`Cached ${photos.length} photos, maintaining ${existingLikedPhotoInfo.length} likes`);
  } catch (error) {
    console.error('Error caching photos:', error);
  }
};

export const getCachedPhotos = async (): Promise<Photo[]> => {
  try {
    const cachedPhotos = await AsyncStorage.getItem(STORAGE_KEYS.PHOTOS_CACHE);
    if (cachedPhotos) {
      return JSON.parse(cachedPhotos);
    }
    return [];
  } catch (error) {
    console.error('Error getting cached photos:', error);
    return [];
  }
};





export const clearCache = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.PHOTOS_CACHE,
    ]);
    console.log('Cache cleared successfully');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

export const getStorageStats = async (): Promise<{
  totalPhotos: number;
  likedPhotos: number;
}> => {
  try {
    const [cachedPhotos, likedPhotoInfo] = await Promise.all([
      getCachedPhotos(),
      getLikedPhotoInfo(),
    ]);

    return {
      totalPhotos: cachedPhotos.length,
      likedPhotos: likedPhotoInfo.length,
    };
  } catch (error) {
    console.error('Error getting storage stats:', error);
    return {
      totalPhotos: 0,
      likedPhotos: 0,
    };
  }
};

export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.LIKED_PHOTOS,
      STORAGE_KEYS.PHOTOS_CACHE,
    ]);
    console.log('All data cleared successfully');
  } catch (error) {
    console.error('Error clearing all data:', error);
  }
};

export const debugStorage = async (): Promise<void> => {
  try {
    console.log('=== PhotoCacheService Debug Info ===');
    
    const [cachedPhotos, likedPhotoInfo] = await Promise.all([
      getCachedPhotos(),
      getLikedPhotoInfo(),
    ]);

    console.log('Cached Photos:', cachedPhotos.length);
    console.log('Liked Photos:', likedPhotoInfo);
    
    const allKeys = await AsyncStorage.getAllKeys();
    console.log('All Storage Keys:', allKeys);
    
    for (const key of allKeys) {
      const value = await AsyncStorage.getItem(key);
      console.log(`${key}:`, value);
    }
    
    console.log('=== End Debug Info ===');
  } catch (error) {
    console.error('Error debugging storage:', error);
  }
};

export const cleanOldStorageKeys = async (): Promise<void> => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const oldKeys = allKeys.filter(key => 
      key.includes('_v1') || 
      key.includes('_v2') || 
      key.includes('_v3') ||
      key === 'liked_photos_v1' ||
      key === 'liked_photos_v2' ||
      key === 'liked_photos_v3' ||
      key === 'photos_cache_v1' ||
      key === 'photos_cache_v2' ||
      key === 'photos_cache_v3'
    );
    
    if (oldKeys.length > 0) {
      await AsyncStorage.multiRemove(oldKeys);
      console.log(`Cleaned up ${oldKeys.length} old storage keys:`, oldKeys);
    }
  } catch (error) {
    console.error('Error cleaning old storage keys:', error);
  }
};
