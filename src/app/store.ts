"use client";
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '@/app/features/productSlice';
import categoryReducer from '@/app/features/categorySlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer
  },
});

// RootState型をエクスポート
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
