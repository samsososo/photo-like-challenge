import {takeLatest} from 'redux-saga/effects';
import {GET_ALL_PHOTO} from '../actions/get-all-photo-action';
import {TOGGLE_PHOTO_LIKE} from '../actions/toggle-photo-like-action';
import {getAllPhotoSaga} from './get-all-photo-saga';
import {togglePhotoLikeSaga} from './toggle-photo-like-saga';

export function* rootSaga() {
  yield takeLatest(GET_ALL_PHOTO, getAllPhotoSaga);
  yield takeLatest(TOGGLE_PHOTO_LIKE, togglePhotoLikeSaga);
}
