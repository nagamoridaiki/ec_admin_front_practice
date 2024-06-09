import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { registerProductApi, fetchProductListApi } from '@/apis/productApi';
import { ProductType, RegisterProductParams } from '@/interfaces/product';

interface ProductState {
  title: string;
  note: string;
  categoryId: number;
  imageUrl: string | undefined;
  products: ProductType[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  title: '',
  note: '',
  categoryId: 1,
  imageUrl: undefined,
  products: [],
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

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    const response = await fetchProductListApi();
    return response?.data && typeof response.data === 'object' ? response.data : [];
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
      // register product
      .addCase(registerProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerProduct.fulfilled, (state, action: PayloadAction<ProductType | undefined>) => {
        state.isLoading = false;
        if (action.payload) {
          state.products.push(action.payload);
        }
      })
      .addCase(registerProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to register product';
      })
      // fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setTitle, setNote, setCategoryId, setImageUrl } = productSlice.actions;
export default productSlice.reducer;