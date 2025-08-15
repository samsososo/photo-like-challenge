import { createAction } from '@reduxjs/toolkit';
import { Photo } from '@/types';

export const IMAGE_ACTIONS = {
  SET_PHOTOS_LOADING: 'image/setPhotosLoading',
  SET_PHOTOS_SUCCESS: 'image/setPhotosSuccess',
  SET_PHOTOS_FAILURE: 'image/setPhotosFailure',
  TOGGLE_PHOTO_LIKE_SUCCESS: 'image/togglePhotoLikeSuccess',
  CLEAR_ERROR: 'image/clearError',
  RESET_PHOTOS: 'image/resetPhotos',
} as const;

export const setPhotosLoading = createAction(IMAGE_ACTIONS.SET_PHOTOS_LOADING);

export const setPhotosSuccess = createAction<{
  photos: Photo[];
  page: number;
}>(IMAGE_ACTIONS.SET_PHOTOS_SUCCESS);

export const setPhotosFailure = createAction<string>(IMAGE_ACTIONS.SET_PHOTOS_FAILURE);

export const togglePhotoLikeSuccess = createAction<{
  photoId: string;
  author: string;
  isLiked: boolean;
}>(IMAGE_ACTIONS.TOGGLE_PHOTO_LIKE_SUCCESS);

export const clearError = createAction(IMAGE_ACTIONS.CLEAR_ERROR);

export const resetPhotos = createAction(IMAGE_ACTIONS.RESET_PHOTOS);

export const addPhoto = createAction<Photo>('image/addPhoto');
export const removePhoto = createAction<string>('image/removePhoto');
export const updatePhoto = createAction<Partial<Photo> & { id: string }>('image/updatePhoto');

export const addMultiplePhotos = createAction<Photo[]>('image/addMultiplePhotos');
export const removeMultiplePhotos = createAction<string[]>('image/removeMultiplePhotos');

export const setPhotoFilter = createAction<{
  author?: string;
  minWidth?: number;
  minHeight?: number;
  likedOnly?: boolean;
}>('image/setPhotoFilter');

export const sortPhotos = createAction<{
  field: 'id' | 'author' | 'width' | 'height' | 'isLiked';
  direction: 'asc' | 'desc';
}>('image/sortPhotos');
