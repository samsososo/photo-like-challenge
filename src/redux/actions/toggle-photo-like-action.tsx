export const TOGGLE_PHOTO_LIKE = 'TOGGLE_PHOTO_LIKE';
export const TOGGLE_PHOTO_LIKE_SUCCESS = 'TOGGLE_PHOTO_LIKE_SUCCESS';
export const TOGGLE_PHOTO_LIKE_FAIL = 'TOGGLE_PHOTO_LIKE_FAIL';

export const togglePhotoLike = (photoId: string, author: string, photoData?: any) => ({
  type: TOGGLE_PHOTO_LIKE,
  photoId,
  author,
  photoData,
});

export const togglePhotoLikeSuccess = (
  photoId: string,
  author: string,
  isLiked: boolean,
) => ({
  type: TOGGLE_PHOTO_LIKE_SUCCESS,
  photoId,
  author,
  isLiked,
});

export const togglePhotoLikeFail = () => ({
  type: TOGGLE_PHOTO_LIKE_FAIL,
});
