import {AnyAction} from 'redux';
import {TOGGLE_PHOTO_LIKE, TOGGLE_PHOTO_LIKE_SUCCESS, TOGGLE_PHOTO_LIKE_FAIL} from '../actions/toggle-photo-like-action';

const initialState = {
  apiStatus: 'NOT_STARTED',
  error: null,
};

export const togglePhotoLikeReducers = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case TOGGLE_PHOTO_LIKE: {
      return {
        ...state,
        apiStatus: 'LOADING',
        error: null,
      };
    }
    case TOGGLE_PHOTO_LIKE_SUCCESS: {
      return {
        ...state,
        apiStatus: 'SUCCESS',
        error: null,
      };
    }
    case TOGGLE_PHOTO_LIKE_FAIL: {
      return {
        ...state,
        apiStatus: 'FAILURE',
        error: 'Failed to toggle photo like',
      };
    }
    default:
      return state;
  }
};
