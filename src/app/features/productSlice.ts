import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { registerProductApi } from '@/apis/productApi';
import { ProductType, RegisterProductParams } from '@/interfaces/product';

interface ProductState {
  title: string;
  note: string;
  categoryId: number;
  imageUrl: string | undefined;
  product: ProductType | undefined;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  title: '',
  note: '',
  categoryId: 1,
  imageUrl: undefined,
  product: undefined,
  isLoading: false,
  error: null,
};

export const registerProduct = createAsyncThunk(
  'product/registerProduct',
  async (productData: RegisterProductParams) => {
    const response = await registerProductApi(productData);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setNote: (state, action: PayloadAction<string>) => {
      state.note = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setImageUrl: (state, action: PayloadAction<string | undefined>) => {
      console.log("action.payload", action.payload)
      state.imageUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerProduct.fulfilled, (state, action: PayloadAction<ProductType | undefined>) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(registerProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to register product';
      });
  },
});

export const { setTitle, setNote, setCategoryId, setImageUrl } = productSlice.actions;
export default productSlice.reducer;