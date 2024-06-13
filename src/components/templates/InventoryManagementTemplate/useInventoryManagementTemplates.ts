import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { fetchProducts } from '@/app/features/productSlice';
import { useState, useCallback, useEffect } from 'react';
import { updateQuantitiesApi } from '@/apis/productApi';

export const useInventoryManagementTemplate = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);
  const [isUpdating, setIsUpdating] = useState(false);
  const [inputValues, setInputValues] = useState<{ [key: string]: number }>({});
  const [changedQuantities, setChangedQuantities] = useState<{ product_id: number, rank: string, old_num: number, new_num: number, inventory_id?: number }[]>([]);

  const navigateToTop = useCallback(() => {
    window.location.href = '/';
  }, []);

  const handleInputChange = useCallback((productId: number, rank: string, value: number) => {
    setInputValues(prevValues => ({
      ...prevValues,
      [`${productId}-${rank}`]: value
    }));
    setChangedQuantities(prev => {
      const product = products.find(p => p.productId === productId);
      const inventory = product?.inventories?.find(inv => inv.rank === rank);
      const oldNum = inventory?.inventoryNum || 0;
      const inventoryId = inventory?.inventoryId || undefined;
      const newQuantities = [...prev.filter(q => !(q.product_id === productId && q.rank === rank)), { product_id: productId, rank, old_num: oldNum, new_num: value, inventory_id: inventoryId }];
      console.log(newQuantities); // デバッグ用のログ
      return newQuantities;
    });
  }, [products]);

  const handleUpdateClick = async (params: { product_id: number, rank: string, old_num: number, new_num: number, inventory_id?: number }[]) => {
    setIsUpdating(true);

    const uniqueParams = params.reduce((acc: { product_id: number; rank: string; old_num: number; new_num: number; inventory_id?: number }[], param) => {
      const existingIndex = acc.findIndex(p => p.product_id === param.product_id && p.rank === param.rank);
      if (existingIndex === -1) {
        acc.push(param);
      } else {
        acc[existingIndex] = param;
      }
      return acc;
    }, []);

    const filteredParams = uniqueParams.filter(param => param.old_num !== param.new_num);
    const updatePromises = filteredParams.map(param => updateQuantitiesApi(param));

    try {
      await Promise.all(updatePromises);
      setChangedQuantities([]);
      dispatch(fetchProducts());
    } catch (error) {
      console.error('Failed to update quantities:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return {
    products,
    isUpdating,
    inputValues,
    changedQuantities,
    setInputValues,
    setChangedQuantities,
    navigateToTop,
    handleInputChange,
    handleUpdateClick
  };
};
