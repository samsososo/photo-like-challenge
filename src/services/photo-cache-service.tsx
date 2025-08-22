import AsyncStorage from '@react-native-async-storage/async-storage';
import {Photo} from '@/types';

const STORAGE_KEYS = {
  LIKED_PHOTOS: 'liked_photos',
  PHOTOS_CACHE: 'photos_cache',
};

export const generatePhotoKey = (photoId: string, author: string, url: string, width: number, height: number): string => {
  return `${photoId}_${author}_${url}_${width}_${height}`;
};

export const parsePhotoKey = (
  photoKey: string,
): {photoId: string; author: string; url: string; width: number; height: number;} | null => {
  const parts = photoKey.split('_');
  
  if (parts.length >= 5) {
    const photoId = parts[0];
    const height = parseInt(parts[parts.length - 1]);
    const width = parseInt(parts[parts.length - 2]);
    const url = parts[parts.length - 3];
    const author = parts.slice(1, parts.length - 3).join('_');
    
    return {
      photoId,
      author,
      url,
      width,
      height,
    };
  }
  return null;
};

export const getPhotoLikeStatus = async (
  photoId: string,
  author: string,
  url: string,
  width: number,
  height: number,
): Promise<boolean> => {
  try {
    const likedPhotos = await AsyncStorage.getItem(STORAGE_KEYS.LIKED_PHOTOS);
    if (likedPhotos) {
      const likedPhotoKeys: string[] = JSON.parse(likedPhotos);
      const photoKey = generatePhotoKey(photoId, author, url, width, height);
      return likedPhotoKeys.includes(photoKey);
    }
    return false;
  } catch (error) {
    console.error('Error getting photo like status:', error);
    return false;
  }
};

export const togglePhotoLike = async (
  photoId: string,
  author: string,
  url: string,
  width: number,
  height: number,
): Promise<boolean> => {
  try {
    const likedPhotos = await AsyncStorage.getItem(STORAGE_KEYS.LIKED_PHOTOS);
    const likedPhotoKeys: string[] = likedPhotos ? JSON.parse(likedPhotos) : [];
    const photoKey = generatePhotoKey(photoId, author, url, width, height);

    let newIsLiked: boolean;

    if (likedPhotoKeys.includes(photoKey)) {
      const newLikedPhotoKeys = likedPhotoKeys.filter(key => key !== photoKey);
      await AsyncStorage.setItem(
        STORAGE_KEYS.LIKED_PHOTOS,
        JSON.stringify(newLikedPhotoKeys),
      );
      newIsLiked = false;
    } else {
      const newLikedPhotoKeys = [...likedPhotoKeys, photoKey];
      await AsyncStorage.setItem(
        STORAGE_KEYS.LIKED_PHOTOS,
        JSON.stringify(newLikedPhotoKeys),
      );
      newIsLiked = true;
    }

    return newIsLiked;
  } catch (error) {
    console.error('Error toggling photo like:', error);
    throw error;
  }
};

export const getLikedPhotoInfo = async (): Promise<
  Array<{photoId: string; author: string; url: string; width: number; height: number;}>
> => {
  try {
    const likedPhotos = await AsyncStorage.getItem(STORAGE_KEYS.LIKED_PHOTOS);
    if (likedPhotos) {
      const likedPhotoKeys: string[] = JSON.parse(likedPhotos);
      const photoInfo: Array<{photoId: string; author: string; url: string; width: number; height: number;}> = [];

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
        likedInfo =>
          likedInfo.photoId === photo.id && likedInfo.author === photo.author,
      );
      return {...photo, isLiked};
    });

    await AsyncStorage.setItem(
      STORAGE_KEYS.PHOTOS_CACHE,
      JSON.stringify(photosWithLikes),
    );
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
    await AsyncStorage.multiRemove([STORAGE_KEYS.PHOTOS_CACHE]);
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
  } catch (error) {
    console.error('Error clearing all data:', error);
  }
};

export const debugStorage = async (): Promise<void> => {
  try {
    const [cachedPhotos, likedPhotoInfo] = await Promise.all([
      getCachedPhotos(),
      getLikedPhotoInfo(),
    ]);

    const allKeys = await AsyncStorage.getAllKeys();

    console.log('Storage Keys Count:', allKeys.length);
    console.log('Storage Keys:', allKeys);
    console.log('Cached Photos:', cachedPhotos);
    console.log('Liked Photos:', likedPhotoInfo);
  } catch (error) {
    console.error('Error debugging storage:', error);
  }
};
