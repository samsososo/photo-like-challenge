import {Photo} from '@/types';
import {APIStatus} from '../constants/constants';
import {AppError} from './error-interface';

export interface ErrorState {
  error?: AppError;
}

export interface CommonState {
  getAllPhotoReducers: {
    apiStatus: APIStatus;
    photos: Photo[];
  };
}
