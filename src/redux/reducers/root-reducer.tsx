import {combineReducers} from 'redux';
import {getAllPhotoReducers} from './get-all-photo-reducers';
import {togglePhotoLikeReducers} from './toggle-photo-like-reducers';

const rootReducer = combineReducers({
  getAllPhotoReducers,
  togglePhotoLikeReducers,
});

export {rootReducer};
