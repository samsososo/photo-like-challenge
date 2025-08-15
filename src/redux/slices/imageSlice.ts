import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Photo } from '@/types';
import { getAllPhotoService } from '@/services/common-services';
import { togglePhotoLike as togglePhotoLikeService } from '@/services/photo-cache-service';

export const fetchAllPhotos = createAsyncThunk(
  'image/fetchAllPhotos',
  async ({ page, limit }: { page: number; limit: number }) => {
    const result = await getAllPhotoService(page, limit);
    if (result && result.success) {
      return { photos: result.payload, page };
    }
    throw new Error('Failed to fetch photos');
  }
);

export const togglePhotoLike = createAsyncThunk(
  'image/togglePhotoLike',
  async ({ photoId, author, isLiked }: { photoId: string; author: string; isLiked: boolean }) => {
    const newIsLiked = await togglePhotoLikeService(photoId, author);
    return { photoId, author, isLiked: newIsLiked };
  }
);

interface ImageState {
  photos: Photo[];
  currentPage: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: ImageState = {
  photos: [],
  currentPage: 1,
  hasMore: true,
  isLoading: false,
  error: null,
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetPhotos: (state) => {
      state.photos = [];
      state.currentPage = 1;
      state.hasMore = true;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPhotos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllPhotos.fulfilled, (state, action) => {
        const { photos, page } = action.payload;
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
        state.error = null;
      })
      .addCase(fetchAllPhotos.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Failed to fetch photos';
      })
      .addCase(togglePhotoLike.fulfilled, (state, action) => {
        const { photoId, author, isLiked } = action.payload;
        const photo = state.photos.find(
          p => p.id === photoId && p.author === author
        );
        if (photo) {
          photo.isLiked = isLiked;
        }
      });
  },
});

export const { clearError, resetPhotos } = imageSlice.actions;
export default imageSlice.reducer;
