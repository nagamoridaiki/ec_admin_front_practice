import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategoriesListApi } from '@/apis/productApi';
import { CategoryType } from '@/interfaces/product';

interface CategoryState {
  categories: CategoryType[],
  isLoading: boolean,
  error: string | null
}

const initialState: CategoryState = {
  categories: [
    {
      categoryId: 1,
      categoryName: '',
    }
  ],
  isLoading: false,
  error: null
}

export const fetchCategoriesList = createAsyncThunk(
  'category/fetchCategoriesList',
  async () => {
    const response = await fetchCategoriesListApi();
    return response.data;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoryType[]>) => {
      state.categories = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchCategoriesList.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchCategoriesList.fulfilled, (state, action: PayloadAction<CategoryType[] | undefined>) => {
      state.isLoading = false;
      state.categories = action.payload || [];
    })
    .addCase(fetchCategoriesList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to register product';
    });
  }

});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
