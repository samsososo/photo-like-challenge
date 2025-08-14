import {takeLatest} from 'redux-saga/effects';
import {GET_ALL_PHOTO} from '../actions/get-all-photo-action';
import {getAllPhotoSaga} from './get-all-photo-saga';

export function* rootSaga() {
  // Auth
  yield takeLatest(GET_ALL_PHOTO, getAllPhotoSaga);
}
