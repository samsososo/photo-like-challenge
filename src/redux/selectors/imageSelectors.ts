import {RootState} from '../store';
import {Photo} from '@/types';

export const selectImageState = (state: RootState) => state.image;

export const selectPhotos = (state: RootState) => state.image.photos;
export const selectCurrentPage = (state: RootState) => state.image.currentPage;
export const selectHasMore = (state: RootState) => state.image.hasMore;
export const selectIsLoading = (state: RootState) => state.image.isLoading;
export const selectError = (state: RootState) => state.image.error;

export const selectLikedPhotos = (state: RootState) =>
  state.image.photos.filter((photo: Photo) => photo.isLiked);

export const selectPhotosCount = (state: RootState) =>
  state.image.photos.length;
export const selectLikedPhotosCount = (state: RootState) =>
  state.image.photos.filter((photo: Photo) => photo.isLiked).length;
