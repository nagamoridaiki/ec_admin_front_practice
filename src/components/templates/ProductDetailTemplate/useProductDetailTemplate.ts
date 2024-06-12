import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { setTitle, setNote, setCategoryId, setImageUrl, registerProduct } from '@/app/features/productSlice';
import { setCategories, fetchCategoriesList } from '@/app/features/categorySlice';
import { useRouter } from 'next/router';
import { NAVIGATION_PATH } from '@/constants/navigation';
import { useImage } from '@/hooks/useImage'

import React, { useState, useCallback, useEffect } from 'react';
import { FaHome } from 'react-icons/fa';
import RankedQuantities from '@/components/organisms/RankedQuantities';
import { fetchProductDetailApi } from '@/apis/productApi';
import { ProductType, RegisterProductParams, CategoryType, listProductParams } from '@/interfaces/product';
import { resetAllMocks } from '@storybook/test';

const toProductMessage = (showProduct: ProductType) => {
  const {
    productId,
    title,
    note,
    imageUrl,
    inventories,
   } = showProduct;

   return {
    productId,
    title,
    note,
    imageUrl,
    inventories,
  }
}

export const useProductDetailTemplates = (productId: number) => {

  const [product, setProduct] = useState<ProductType | undefined>(undefined)

  const [inventoryState, setInventoryState] = useState({
    S: { price: 0, inventoryNum: 0 },
    A: { price: 0, inventoryNum: 0 },
    B: { price: 0, inventoryNum: 0 },
    C: { price: 0, inventoryNum: 0 }
  });

  // ランクごとの金額や在庫数が入力されたタイミングで瞬時に状態管理しておく
  const handleInputChange = (rank: 'S' | 'A' | 'B' | 'C', field: 'price' | 'inventoryNum', value: number) => {
    setInventoryState(prevState => {
      const newState = {
        ...prevState,
        [rank]: {
          ...prevState[rank],
          [field]: value
        }
      };
      console.log('Updated Inventory State:', newState);
      return newState;
    });
  };

  const navigateToTop = useCallback(() => {
    window.location.href = '/';
  }, []);

  const handleUpdateClick = () => {
    console.log('inventoryStateの中身', inventoryState);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetchProductDetailApi(Number(productId));
      setProduct(res?.data && typeof res.data === 'object' ? toProductMessage(res.data) : undefined)
    };
    fetchProduct();
  }, [productId]);

  // 商品情報を取得したタイミングで、商品情報をデフォルト値として設定
  useEffect(() => {
    if (product && product.inventories) {
      const updatedState = { ...inventoryState };
      product.inventories.forEach(inv => {
        if (inv.rank in updatedState) {
          updatedState[inv.rank as keyof typeof updatedState] = { price: inv.price, inventoryNum: inv.inventoryNum };
        }
      });
      setInventoryState(updatedState);
    }
  }, [product]);

  return {
    product,
    navigateToTop,
    handleUpdateClick,
    handleInputChange
  }

}

