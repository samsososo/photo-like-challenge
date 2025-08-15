import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {Photo} from '@/types';
import {APIStatus} from '@/constants/constants';
import {getAllPhotoService} from '@/services/common-services';
import {togglePhotoLike as togglePhotoLikeService} from '@/services/photo-cache-service';

export const fetchAllPhotos = createAsyncThunk(
  'image/fetchAllPhotos',
  async ({page, limit}: {page: number; limit: number}, {rejectWithValue}) => {
    try {
      const result = await getAllPhotoService(page, limit);
      if (result && result.success) {
        return {photos: result.payload, page};
      } else {
        return rejectWithValue(result?.error || 'Failed to fetch photos');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch photos');
    }
  },
);

export const togglePhotoLike = createAsyncThunk(
  'image/togglePhotoLike',
  async (
    {
      photoId,
      author,
      isLiked,
    }: {photoId: string; author: string; isLiked: boolean},
    {rejectWithValue},
  ) => {
    try {
      const newIsLiked = await togglePhotoLikeService(photoId, author);
      return {photoId, author, isLiked: newIsLiked};
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to toggle photo like');
    }
  },
);

interface ImageState {
  photos: Photo[];
  currentPage: number;
  hasMore: boolean;
  isLoading: boolean;
  apiStatus: APIStatus;
  error: string | null;
}

const initialState: ImageState = {
  photos: [],
  currentPage: 1,
  hasMore: true,
  isLoading: false,
  apiStatus: APIStatus.NOT_STARTED,
  error: null,
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    resetPhotos: state => {
      state.photos = [];
      state.currentPage = 1;
      state.hasMore = true;
      state.isLoading = false;
      state.apiStatus = APIStatus.NOT_STARTED;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllPhotos.pending, state => {
        state.isLoading = true;
        state.apiStatus = APIStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchAllPhotos.fulfilled, (state, action) => {
        const {photos, page} = action.payload;
        const isFirstPage = page === 1;
        const hasMore = photos.length >= 8;

        if (isFirstPage) {
          state.photos = photos;
        } else {
          state.photos = [...state.photos, ...photos];
        }

        state.currentPage = page;
        state.hasMore = hasMore;
        state.isLoading = false;
        state.apiStatus = APIStatus.SUCCESS;
        state.error = null;
      })
      .addCase(fetchAllPhotos.rejected, (state, action) => {
        state.isLoading = false;
        state.apiStatus = APIStatus.FAILURE;
        state.error = (action.payload as string) || 'Failed to fetch photos';
      })
      .addCase(togglePhotoLike.fulfilled, (state, action) => {
        const {photoId, author, isLiked} = action.payload;
        const photoIndex = state.photos.findIndex(
          photo => photo.id === photoId && photo.author === author,
        );

        if (photoIndex !== -1) {
          state.photos[photoIndex].isLiked = isLiked;
        }
      })
      .addCase(togglePhotoLike.rejected, (state, action) => {
        state.error =
          (action.payload as string) || 'Failed to toggle photo like';
      });
  },
});

export const {clearError, resetPhotos} = imageSlice.actions;

export default imageSlice.reducer;
