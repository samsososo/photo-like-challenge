import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchAllPhotos, togglePhotoLike } from '../slices/imageSlice';

export const useImageState = () => {
  const dispatch = useDispatch<AppDispatch>();

  const photos = useSelector((state: RootState) => state.image.photos);
  const currentPage = useSelector((state: RootState) => state.image.currentPage);
  const hasMore = useSelector((state: RootState) => state.image.hasMore);
  const isLoading = useSelector((state: RootState) => state.image.isLoading);
  const error = useSelector((state: RootState) => state.image.error);

  const fetchPhotos = (page: number, limit: number) => {
    dispatch(fetchAllPhotos({ page, limit }));
  };

  const toggleLike = (photoId: string, author: string, isLiked: boolean) => {
    dispatch(togglePhotoLike({ photoId, author, isLiked }));
  };

  return {
    photos,
    currentPage,
    hasMore,
    isLoading,
    error,
    fetchPhotos,
    toggleLike,
  };
};
