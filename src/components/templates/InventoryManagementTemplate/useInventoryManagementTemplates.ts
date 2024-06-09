import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { setTitle, setNote, setCategoryId, setImageUrl, registerProduct, fetchProducts } from '@/app/features/productSlice';
import { setCategories, fetchCategoriesList } from '@/app/features/categorySlice';
import { useRef, useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NAVIGATION_PATH } from '@/constants/navigation';
import { useImage } from '@/hooks/useImage'


export const useArrivingProductsTempdates = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return {
    products
  };
};
