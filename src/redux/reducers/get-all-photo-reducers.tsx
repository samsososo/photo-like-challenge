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
} = {
  apiStatus: APIStatus.NOT_STARTED,
  photos: [],
};

export const getAllPhotoReducers = (state = initiState, action: AnyAction) => {
  switch (action.type) {
    case GET_ALL_PHOTO: {
      return {
        ...state,
        apiStatus: APIStatus.LOADING,
      };
    }
    case GET_ALL_PHOTO_SUCCESS: {
      return {
        ...state,
        apiStatus: APIStatus.SUCCESS,
        photos: action.photos,
      };
    }
    case GET_ALL_PHOTO_FAIL: {
      return {
        ...state,
        apiStatus: APIStatus.FAILURE,
      };
    }
    case RESET_GET_ALL_PHOTO: {
      return {
        ...state,
        apiStatus: APIStatus.NOT_STARTED,
      };
    }
    default:
      return {...state};
  }
};
