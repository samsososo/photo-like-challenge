import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import {
  selectPhotos,
  selectCurrentPage,
  selectHasMore,
  selectIsLoading,
  selectApiStatus,
  selectError,
  selectLikedPhotos,
  selectLikedPhotosCount,
  selectFilteredPhotos,
  selectSortedPhotos,
  selectTotalPhotosCount,
  selectPhotosByDimension,
  selectAuthorsList,
} from '../selectors/imageSelectors';
import {
  setPhotosLoading,
  setPhotosSuccess,
  setPhotosFailure,
  togglePhotoLikeSuccess,
  clearError,
  resetPhotos,
  addPhoto,
  removePhoto,
  updatePhoto,
  addMultiplePhotos,
  removeMultiplePhotos,
  setPhotoFilter,
  sortPhotos,
  fetchAllPhotos,
  togglePhotoLike,
} from '../slices/imageSlice';

export const useImageState = () => {
  const dispatch = useDispatch<AppDispatch>();

  const photos = useSelector(selectPhotos);
  const currentPage = useSelector(selectCurrentPage);
  const hasMore = useSelector(selectHasMore);
  const isLoading = useSelector(selectIsLoading);
  const apiStatus = useSelector(selectApiStatus);
  const error = useSelector(selectError);
  const likedPhotos = useSelector(selectLikedPhotos);
  const likedPhotosCount = useSelector(selectLikedPhotosCount);
  const filteredPhotos = useSelector(selectFilteredPhotos);
  const sortedPhotos = useSelector(selectSortedPhotos);
  const totalPhotosCount = useSelector(selectTotalPhotosCount);
  const photosByDimension = useSelector(selectPhotosByDimension);
  const authorsList = useSelector(selectAuthorsList);

  const actions = {
    fetchAllPhotos: (page: number, limit: number) => 
      dispatch(fetchAllPhotos({ page, limit })),
    togglePhotoLike: (photoId: string, author: string, isLiked: boolean) => 
      dispatch(togglePhotoLike({ photoId, author, isLiked })),
    
    setPhotosLoading: () => dispatch(setPhotosLoading()),
    setPhotosSuccess: (payload: { photos: any[]; page: number }) => 
      dispatch(setPhotosSuccess(payload)),
    setPhotosFailure: (error: string) => dispatch(setPhotosFailure(error)),
    togglePhotoLikeSuccess: (payload: { photoId: string; author: string; isLiked: boolean }) => 
      dispatch(togglePhotoLikeSuccess(payload)),
    
    clearError: () => dispatch(clearError()),
    resetPhotos: () => dispatch(resetPhotos()),
    addPhoto: (photo: any) => dispatch(addPhoto(photo)),
    removePhoto: (photoId: string) => dispatch(removePhoto(photoId)),
    updatePhoto: (payload: Partial<any> & { id: string }) => dispatch(updatePhoto(payload)),
    addMultiplePhotos: (photos: any[]) => dispatch(addMultiplePhotos(photos)),
    removeMultiplePhotos: (photoIds: string[]) => dispatch(removeMultiplePhotos(photoIds)),
    setPhotoFilter: (filters: {
      author?: string;
      minWidth?: number;
      minHeight?: number;
      likedOnly?: boolean;
    }) => dispatch(setPhotoFilter(filters)),
    sortPhotos: (sort: {
      field: 'id' | 'author' | 'width' | 'height' | 'isLiked';
      direction: 'asc' | 'desc';
    }) => dispatch(sortPhotos(sort)),
  };

  return {
    photos,
    currentPage,
    hasMore,
    isLoading,
    apiStatus,
    error,
    likedPhotos,
    likedPhotosCount,
    filteredPhotos,
    sortedPhotos,
    totalPhotosCount,
    photosByDimension,
    authorsList,
    actions,
  };
};
