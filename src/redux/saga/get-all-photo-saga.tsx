import {call, put} from 'redux-saga/effects';
import {getAllPhotoSuccess, getAllPhotoFailed} from '../actions/get-all-photo-action';
import {getAllPhotoService} from '@/services/common-services';

export function* getAllPhotoSaga(action: any): Generator<any, void, any> {
  try {
    const res = yield call(getAllPhotoService, action.page, action.limit);
    if (res.success) {
      yield put(getAllPhotoSuccess(res.payload, action.page));
    } else {
      yield put(getAllPhotoFailed());
    }
  } catch (error) {
    console.error('Error in getAllPhotoSaga:', error);
    yield put(getAllPhotoFailed());
  }
}
