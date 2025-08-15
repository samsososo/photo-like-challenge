export {default as store} from './store';
export type {RootState, AppDispatch} from './store';

export {default as imageReducer} from './slices/imageSlice';
export {clearError, resetPhotos} from './slices/imageSlice';

export {fetchAllPhotos, togglePhotoLike} from './slices/imageSlice';

export {
  IMAGE_ACTIONS,
  clearError as clearErrorAction,
  resetPhotos as resetPhotosAction,
} from './actions/imageActions';

export {
  selectImageState,
  selectPhotos,
  selectCurrentPage,
  selectHasMore,
  selectIsLoading,
  selectError,
  selectLikedPhotos,
  selectPhotosCount,
  selectLikedPhotosCount,
} from './selectors/imageSelectors';

export {useImageState} from './hooks/useImageState';

export {rootReducer} from './reducers/root-reducer';
export {getAllPhotoReducers} from './reducers/get-all-photo-reducers';
export {togglePhotoLikeReducers} from './reducers/toggle-photo-like-reducers';
