import React, { useState, useCallback, useEffect } from 'react';
import { fetchProductDetailApi } from '@/apis/productApi';
import { ProductType } from '@/interfaces/product';
import { updateQuantitiesApi } from '@/apis/productApi';

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

type InventoryState = {
  S: { price: number, pre_inventory_num: number, af_inventory_num: number },
  A: { price: number, pre_inventory_num: number, af_inventory_num: number },
  B: { price: number, pre_inventory_num: number, af_inventory_num: number },
  C: { price: number, pre_inventory_num: number, af_inventory_num: number }
};

export const useProductDetailTemplates = (productId: number) => {

  const [product, setProduct] = useState<ProductType | undefined>(undefined)
  const [isUpdating, setIsUpdating] = useState(false);
  const initialInventoryState: InventoryState = {
    S: { price: 0, pre_inventory_num: 0, af_inventory_num: 0 },
    A: { price: 0, pre_inventory_num: 0, af_inventory_num: 0 },
    B: { price: 0, pre_inventory_num: 0, af_inventory_num: 0 },
    C: { price: 0, pre_inventory_num: 0, af_inventory_num: 0 }
  };
  const [inventoryState, setInventoryState] = useState(initialInventoryState);

  const fetchProduct = async () => {
    const res = await fetchProductDetailApi(Number(productId));
    setProduct(res?.data && typeof res.data === 'object' ? toProductMessage(res.data) : undefined);
  };

  // ランクごとの金額や在庫数が入力されたタイミングで瞬時に状態管理しておく
  const handleInputChange = (rank: 'S' | 'A' | 'B' | 'C', field: 'price' | 'af_inventory_num', value: number) => {
    setInventoryState(prevState => {
      const newState = {
        ...prevState,
        [rank]: {
          ...prevState[rank],
          [field]: value
        }
      };
      return newState;
    });
  };

  const navigateToTop = useCallback(() => {
    window.location.href = '/';
  }, []);

  const handleUpdateClick = async (params: InventoryState) => {

    setIsUpdating(true);

    const updatePromises = (['S', 'A', 'B', 'C'] as const).map(rank => {
      const { price, pre_inventory_num, af_inventory_num } = params[rank];

      return updateQuantitiesApi({
        product_id: productId,
        rank,
        new_price: price,
        old_num: pre_inventory_num,
        new_num: af_inventory_num,
        inventory_id: product?.inventories?.find(inv => inv.rank === rank)?.inventoryId ?? undefined
      });
    });

    try {
      await Promise.all(updatePromises);
      setInventoryState(initialInventoryState);
      fetchProduct();
    } catch (error) {
      console.error('Failed to update quantities:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  // 商品情報を取得したタイミングで、商品情報をデフォルト値として設定
  useEffect(() => {
    if (product && product.inventories) {
      const updatedState = { ...inventoryState };
      product.inventories.forEach(inv => {
        if (inv.rank in updatedState) {
          updatedState[inv.rank as keyof typeof updatedState] = {
            price: inv.price,
            pre_inventory_num: inv.inventoryNum,
            af_inventory_num: inv.inventoryNum
          };
        }
      });
      setInventoryState(updatedState);
    }
  }, [product]);
  return {
    product,
    inventoryState,
    isUpdating,
    navigateToTop,
    handleUpdateClick,
    handleInputChange
  }

}
