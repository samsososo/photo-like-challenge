import {createAction} from '@reduxjs/toolkit';
import {Photo} from '@/types';

export const IMAGE_ACTIONS = {
  CLEAR_ERROR: 'image/clearError',
  RESET_PHOTOS: 'image/resetPhotos',
} as const;

export const clearError = createAction(IMAGE_ACTIONS.CLEAR_ERROR);
export const resetPhotos = createAction(IMAGE_ACTIONS.RESET_PHOTOS);
