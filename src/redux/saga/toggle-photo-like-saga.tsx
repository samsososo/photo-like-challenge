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

    const newIsLiked = yield call(togglePhotoLikeService, photoId, author);

    yield put(togglePhotoLikeSuccess(photoId, author, newIsLiked));
    console.log(`Photo ${photoId} (${author}) like status updated successfully to: ${newIsLiked}`);
  } catch (error) {
    console.error('Error in togglePhotoLikeSaga:', error);
    yield put(togglePhotoLikeFail());
  }
}
