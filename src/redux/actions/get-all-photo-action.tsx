import {Photo} from '@/types';

export const GET_ALL_PHOTO = 'GET_ALL_PHOTO';
export const GET_ALL_PHOTO_SUCCESS = 'GET_ALL_PHOTO_SUCCESS';
export const GET_ALL_PHOTO_FAIL = 'GET_ALL_PHOTO_FAIL';
export const RESET_GET_ALL_PHOTO = 'RESET_GET_ALL_PHOTO';

export const getAllPhoto = (page: number, limit: number) => ({
  type: GET_ALL_PHOTO,
  page,
  limit,
});

export const getAllPhotoSuccess = (photos: Photo[], page: number) => ({
  type: GET_ALL_PHOTO_SUCCESS,
  photos,
  page,
});

export const getAllPhotoFailed = () => ({
  type: GET_ALL_PHOTO_FAIL,
});

export const resetgetAllPhoto = () => ({
  type: RESET_GET_ALL_PHOTO,
});
