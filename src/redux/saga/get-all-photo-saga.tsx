import {call, put} from 'redux-saga/effects';
import {getAllPhotoService} from '@/services/common-services';
import {
  getAllPhotoFailed,
  getAllPhotoSuccess,
} from '../actions/get-all-photo-action';

export function* getAllPhotoSaga(action: any) {
  try {
    const res = yield call(() => getAllPhotoService(action.page, action.limit));

    if (res && res.success) {
      yield put(getAllPhotoSuccess(res.payload));
    } else {
      yield put(getAllPhotoFailed());
      //   Alert.alert(
      //     // i18n.t('common.SHARED_ERROR_ALERT_TITLE'),
      //     // i18n.t('common.SHARED_ALERT_SYSTEM_ERROR'),
      //   );
    }
  } catch (error) {
    yield put(getAllPhotoFailed());
  }
}
