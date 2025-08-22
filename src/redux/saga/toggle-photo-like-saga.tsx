import {call, put} from 'redux-saga/effects';
import {togglePhotoLike as togglePhotoLikeService} from '@/services/photo-cache-service';
import {
  togglePhotoLikeSuccess,
  togglePhotoLikeFail,
} from '../actions/toggle-photo-like-action';

export function* togglePhotoLikeSaga(action: any): Generator<any, void, any> {
  try {
    const photoId = action.photoId;
    const author = action.author;
    const photoData = action.photoData;

    // Extract required fields from photoData or use defaults
    const url = photoData?.url || '';
    const width = photoData?.width || 0;
    const height = photoData?.height || 0;

    const newIsLiked = yield call(togglePhotoLikeService, photoId, author, url, width, height);

    yield put(togglePhotoLikeSuccess(photoId, author, newIsLiked));
  } catch (error) {
    console.error('Error in togglePhotoLikeSaga:', error);
    yield put(togglePhotoLikeFail());
  }
}
