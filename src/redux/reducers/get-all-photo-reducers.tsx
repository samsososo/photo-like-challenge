import {AnyAction} from 'redux';
import {APIStatus} from '../../constants/constants';
import {
  GET_ALL_PHOTO,
  GET_ALL_PHOTO_SUCCESS,
  GET_ALL_PHOTO_FAIL,
  RESET_GET_ALL_PHOTO,
} from '../actions/get-all-photo-action';
import {Photo} from '@/types';

const initiState: {
  apiStatus: APIStatus;
  photos: Photo[];
  currentPage: number;
  hasMore: boolean;
  isLoading: boolean;
} = {
  apiStatus: APIStatus.NOT_STARTED,
  photos: [],
  currentPage: 1,
  hasMore: true,
  isLoading: false,
};

export const getAllPhotoReducers = (state = initiState, action: AnyAction) => {
  switch (action.type) {
    case GET_ALL_PHOTO: {
      return {
        ...state,
        apiStatus: APIStatus.LOADING,
        isLoading: true,
      };
    }
    case GET_ALL_PHOTO_SUCCESS: {
      const newPhotos = action.photos;
      const isFirstPage = action.page === 1;
      const hasMore = newPhotos.length >= 8;
      return {
        ...state,
        apiStatus: APIStatus.SUCCESS,
        photos: isFirstPage ? newPhotos : [...state.photos, ...newPhotos],
        currentPage: action.page,
        hasMore,
        isLoading: false,
      };
    }
    case GET_ALL_PHOTO_FAIL: {
      return {
        ...state,
        apiStatus: APIStatus.FAILURE,
        isLoading: false,
      };
    }
    case RESET_GET_ALL_PHOTO: {
      return {
        ...state,
        apiStatus: APIStatus.NOT_STARTED,
        photos: [],
        currentPage: 1,
        hasMore: true,
        isLoading: false,
      };
    }
    default:
      return {...state};
  }
};
