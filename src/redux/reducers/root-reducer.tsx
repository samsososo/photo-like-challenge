import {combineReducers} from 'redux';
import {getAllPhotoReducers} from './get-all-photo-reducers';

export const rootReducer = combineReducers({
  getAllPhotoReducers,
});
