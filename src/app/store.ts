"use client";
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '@/app/features/productSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

// RootState型をエクスポート
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
