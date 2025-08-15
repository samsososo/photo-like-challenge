export {default as store} from './store';
export type {RootState, AppDispatch} from './store';

export {default as imageReducer} from './slices/imageSlice';
export {
  setPhotosLoading,
  setPhotosSuccess,
  setPhotosFailure,
  togglePhotoLikeSuccess,
  clearError,
  resetPhotos,
  addPhoto,
  removePhoto,
  updatePhoto,
  addMultiplePhotos,
  removeMultiplePhotos,
  setPhotoFilter,
  sortPhotos,
} from './slices/imageSlice';

export {fetchAllPhotos, togglePhotoLike} from './slices/imageSlice';

export {
  IMAGE_ACTIONS,
  setPhotosLoading as setPhotosLoadingAction,
  setPhotosSuccess as setPhotosSuccessAction,
  setPhotosFailure as setPhotosFailureAction,
  togglePhotoLikeSuccess as togglePhotoLikeSuccessAction,
  clearError as clearErrorAction,
  resetPhotos as resetPhotosAction,
  addPhoto as addPhotoAction,
  removePhoto as removePhotoAction,
  updatePhoto as updatePhotoAction,
  addMultiplePhotos as addMultiplePhotosAction,
  removeMultiplePhotos as removeMultiplePhotosAction,
  setPhotoFilter as setPhotoFilterAction,
  sortPhotos as sortPhotosAction,
} from './actions/imageActions';

export {
  selectImageState,
  selectPhotos,
  selectCurrentPage,
  selectHasMore,
  selectIsLoading,
  selectApiStatus,
  selectError,
  selectLikedPhotos,
  selectLikedPhotosCount,
  selectPhotoById,
  selectPhotosByAuthor,
  selectFilteredPhotos,
  selectSortedPhotos,
  selectTotalPhotosCount,
  selectPhotosByDimension,
  selectAuthorsList,
  selectFilters,
  selectSort,
  selectLegacyPhotos,
  selectLegacyCurrentPage,
  selectLegacyHasMore,
  selectLegacyIsLoading,
} from './selectors/imageSelectors';

export {useImageState} from './hooks/useImageState';

export {rootReducer} from './reducers/root-reducer';
export {getAllPhotoReducers} from './reducers/get-all-photo-reducers';
export {togglePhotoLikeReducers} from './reducers/toggle-photo-like-reducers';
