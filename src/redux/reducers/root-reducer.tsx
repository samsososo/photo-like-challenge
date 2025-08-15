import {combineReducers} from 'redux';
import {getAllPhotoReducers} from './get-all-photo-reducers';
import {togglePhotoLikeReducers} from './toggle-photo-like-reducers';
import imageReducer from '../slices/imageSlice';

const rootReducer = combineReducers({
  getAllPhotoReducers,
  togglePhotoLikeReducers,
  image: imageReducer,
});

export {rootReducer};
