import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { setTitle, setNote, setCategoryId, setImageUrl, registerProduct, fetchProducts } from '@/app/features/productSlice';
import { setCategories, fetchCategoriesList } from '@/app/features/categorySlice';
import { useRef, useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NAVIGATION_PATH } from '@/constants/navigation';
import { useImage } from '@/hooks/useImage'
import { updateQuantitiesApi } from '@/apis/productApi';



export const useInventoryManagementTemplate = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateClick = async (params: { product_id: number, rank: string, old_num: number, new_num: number, inventory_id?: number }[]) => {

    // product_idとrankの組み合わせが重複 => 最後に配列に入ったものだけ残す
    const uniqueParams = params.reduce((acc: { product_id: number; rank: string; old_num: number; new_num: number; inventory_id?: number }[], param) => {
      setIsUpdating(true);
      const existingIndex = acc.findIndex(p => p.product_id === param.product_id && p.rank === param.rank);
      if (existingIndex === -1) {
        acc.push(param);
      } else {
        acc[existingIndex] = param;
      }
      return acc;
    }, []);

    // 数量が変わらない => 配列から除外
    const filteredParams = uniqueParams.filter(param => param.old_num !== param.new_num);

    const updatePromises = filteredParams.map(param => updateQuantitiesApi(param));
    await Promise.all(updatePromises);

    setIsUpdating(false);
    dispatch(fetchProducts());
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return {
    products,
    isUpdating,
    handleUpdateClick
  };
};
