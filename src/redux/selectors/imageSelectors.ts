import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Photo } from '@/types';

export const selectImageState = (state: RootState) => state.image;

export const selectPhotos = createSelector(
  [selectImageState],
  (imageState) => imageState.photos
);

export const selectCurrentPage = createSelector(
  [selectImageState],
  (imageState) => imageState.currentPage
);

export const selectHasMore = createSelector(
  [selectImageState],
  (imageState) => imageState.hasMore
);

export const selectIsLoading = createSelector(
  [selectImageState],
  (imageState) => imageState.isLoading
);

export const selectApiStatus = createSelector(
  [selectImageState],
  (imageState) => imageState.apiStatus
);

export const selectError = createSelector(
  [selectImageState],
  (imageState) => imageState.error
);

export const selectFilters = createSelector(
  [selectImageState],
  (imageState) => imageState.filters
);

export const selectSort = createSelector(
  [selectImageState],
  (imageState) => imageState.sort
);

export const selectLikedPhotos = createSelector(
  [selectPhotos],
  (photos) => photos.filter((photo: Photo) => photo.isLiked)
);

export const selectLikedPhotosCount = createSelector(
  [selectLikedPhotos],
  (likedPhotos) => likedPhotos.length
);

export const selectPhotoById = createSelector(
  [selectPhotos, (_, photoId: string) => photoId],
  (photos, photoId) => photos.find((photo: Photo) => photo.id === photoId)
);

export const selectPhotosByAuthor = createSelector(
  [selectPhotos, (_, author: string) => author],
  (photos, author) => photos.filter((photo: Photo) => photo.author === author)
);

export const selectFilteredPhotos = createSelector(
  [selectPhotos, selectFilters],
  (photos, filters) => {
    let filtered = photos;
    
    if (filters.author) {
      filtered = filtered.filter((photo: Photo) => 
        photo.author.toLowerCase().includes(filters.author!.toLowerCase())
      );
    }
    
    if (filters.minWidth) {
      filtered = filtered.filter((photo: Photo) => photo.width >= filters.minWidth!);
    }
    
    if (filters.minHeight) {
      filtered = filtered.filter((photo: Photo) => photo.height >= filters.minHeight!);
    }
    
    if (filters.likedOnly) {
      filtered = filtered.filter((photo: Photo) => photo.isLiked);
    }
    
    return filtered;
  }
);

export const selectSortedPhotos = createSelector(
  [selectFilteredPhotos, selectSort],
  (photos, sort) => {
    const sorted = [...photos];
    
    sorted.sort((a: Photo, b: Photo) => {
      let aValue: any = a[sort.field];
      let bValue: any = b[sort.field];
      
      if (sort.field === 'isLiked') {
        aValue = aValue ? 1 : 0;
        bValue = bValue ? 1 : 0;
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) {
        return sort.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sort.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    return sorted;
  }
);

export const selectTotalPhotosCount = createSelector(
  [selectPhotos],
  (photos) => photos.length
);

export const selectPhotosByDimension = createSelector(
  [selectPhotos],
  (photos) => {
    const small = photos.filter((p: Photo) => p.width < 1000 && p.height < 1000).length;
    const medium = photos.filter((p: Photo) => 
      (p.width >= 1000 && p.width < 2000) || (p.height >= 1000 && p.height < 2000)
    ).length;
    const large = photos.filter((p: Photo) => p.width >= 2000 || p.height >= 2000).length;
    
    return { small, medium, large };
  }
);

export const selectAuthorsList = createSelector(
  [selectPhotos],
  (photos) => [...new Set(photos.map((photo: Photo) => photo.author))]
);

export const selectLegacyPhotos = (state: RootState) => state.getAllPhotoReducers.photos;
export const selectLegacyCurrentPage = (state: RootState) => state.getAllPhotoReducers.currentPage;
export const selectLegacyHasMore = (state: RootState) => state.getAllPhotoReducers.hasMore;
export const selectLegacyIsLoading = (state: RootState) => state.getAllPhotoReducers.isLoading;
