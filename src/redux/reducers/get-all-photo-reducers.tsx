import {AnyAction} from 'redux';
import {GET_ALL_PHOTO, GET_ALL_PHOTO_SUCCESS, GET_ALL_PHOTO_FAIL} from '../actions/get-all-photo-action';
import {TOGGLE_PHOTO_LIKE_SUCCESS} from '../actions/toggle-photo-like-action';
import {APIStatus} from '@/constants/constants';
import {Photo} from '@/types';

const initialState = {
  apiStatus: APIStatus.NOT_STARTED,
  photos: [] as Photo[],
  currentPage: 1,
  hasMore: true,
  isLoading: false,
};

export const getAllPhotoReducers = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_ALL_PHOTO: {
      return {
        ...state,
        apiStatus: APIStatus.LOADING,
        isLoading: true,
      };
    }

    case GET_ALL_PHOTO_SUCCESS: {
      const newPhotos: Photo[] = action.photos;
      const isFirstPage = action.page === 1;
      const hasMore = newPhotos.length >= 8;

      let updatedPhotos: Photo[];
      if (isFirstPage) {
        updatedPhotos = newPhotos;
      } else {
        const existingPhotos = state.photos;
        updatedPhotos = [...existingPhotos, ...newPhotos];
      }

      return {
        ...state,
        apiStatus: APIStatus.SUCCESS,
        photos: updatedPhotos,
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

    case TOGGLE_PHOTO_LIKE_SUCCESS: {
      const updatedPhotos = state.photos.map(photo =>
        photo.id === action.photoId && photo.author === action.author
          ? { ...photo, isLiked: action.isLiked }
          : photo
      );
      return {
        ...state,
        photos: updatedPhotos,
      };
    }

    default:
      return state;
  }
};
