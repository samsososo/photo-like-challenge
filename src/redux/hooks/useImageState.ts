import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../store';
import {
  selectPhotos,
  selectCurrentPage,
  selectHasMore,
  selectIsLoading,
  selectError,
  selectLikedPhotos,
  selectPhotosCount,
  selectLikedPhotosCount,
} from '../selectors/imageSelectors';
import {
  clearError,
  resetPhotos,
  fetchAllPhotos,
  togglePhotoLike,
} from '../slices/imageSlice';

export const useImageState = () => {
  const dispatch = useDispatch<AppDispatch>();

  const photos = useSelector(selectPhotos);
  const currentPage = useSelector(selectCurrentPage);
  const hasMore = useSelector(selectHasMore);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const likedPhotos = useSelector(selectLikedPhotos);
  const photosCount = useSelector(selectPhotosCount);
  const likedPhotosCount = useSelector(selectLikedPhotosCount);

  const actions = {
    fetchAllPhotos: (page: number, limit: number) =>
      dispatch(fetchAllPhotos({page, limit})),
    togglePhotoLike: (photoId: string, author: string, isLiked: boolean) =>
      dispatch(togglePhotoLike({photoId, author, isLiked})),
    clearError: () => dispatch(clearError()),
    resetPhotos: () => dispatch(resetPhotos()),
  };

  return {
    photos,
    currentPage,
    hasMore,
    isLoading,
    error,
    likedPhotos,
    photosCount,
    likedPhotosCount,
    actions,
  };
};
