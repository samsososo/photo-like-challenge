import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Photo} from '@/types';

export const selectImageState = (state: RootState) => state.image;

export const selectPhotos = createSelector(
  [selectImageState],
  imageState => imageState.photos,
);

export const selectCurrentPage = createSelector(
  [selectImageState],
  imageState => imageState.currentPage,
);

export const selectHasMore = createSelector(
  [selectImageState],
  imageState => imageState.hasMore,
);

export const selectIsLoading = createSelector(
  [selectImageState],
  imageState => imageState.isLoading,
);

export const selectError = createSelector(
  [selectImageState],
  imageState => imageState.error,
);

export const selectLikedPhotos = createSelector([selectPhotos], photos =>
  photos.filter((photo: Photo) => photo.isLiked),
);

export const selectPhotosCount = createSelector(
  [selectPhotos],
  photos => photos.length,
);

export const selectLikedPhotosCount = createSelector(
  [selectLikedPhotos],
  likedPhotos => likedPhotos.length,
);
