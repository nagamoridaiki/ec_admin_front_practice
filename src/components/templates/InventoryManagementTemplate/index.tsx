"use client";

import React, { useState, useCallback } from 'react';
import { useInventoryManagementTemplate } from './useInventoryManagementTemplates';
import { FaHome } from 'react-icons/fa';
import RankedQuantities from '@/components/organisms/RankedQuantities';

const Header: React.FC<{ onNavigateToTop: () => void }> = ({ onNavigateToTop }) => (
  <header className="flex items-center p-5 bg-gray-100 border-b-2 border-gray-300">
    <FaHome className="mr-auto cursor-pointer text-2xl" onClick={onNavigateToTop} />
    <h1 className="mx-auto text-xl font-bold">商品一覧</h1>
  </header>
);

export const InventoryManagementTemplate: React.FC = () => {
  const { products, isUpdating, handleUpdateClick } = useInventoryManagementTemplate(); // 登録済みの商品一覧データ
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
      const newQuantities = [...prev, { product_id: productId, rank, old_num: oldNum, new_num: value, inventory_id: inventoryId }];
      console.log(newQuantities); // デバッグ用のログ
      return newQuantities;
    });
  }, [products]);

  return (
    <div>
      <Header onNavigateToTop={navigateToTop} />
      <ul className="list-none p-0">
        {products.map((product) => (
          <RankedQuantities
            key={product.productId}
            product={product}
            inputValues={inputValues}
            onInputChange={handleInputChange}
          />
        ))}
      </ul>
      <button
        className="block mx-auto my-5 px-5 py-2 bg-blue-500 text-white border-none rounded cursor-pointer"
        onClick={() => handleUpdateClick(changedQuantities)}
        disabled={isUpdating}
      >
        {isUpdating ? '更新中...' : '更新'}
      </button>
    </div>
  );
};
