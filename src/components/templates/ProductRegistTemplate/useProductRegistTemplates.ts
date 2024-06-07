import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { setTitle, setNote, setCategoryId, setImageUrl, registerProduct } from '@/app/features/productSlice';
import { useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { NAVIGATION_PATH } from '@/constants/navigation';
import { useImage } from '@/hooks/useImage'

export const useProductRegistTemplates = () => {

  const dispatch: AppDispatch = useDispatch();
  const { title, note, categoryId } = useSelector((state: RootState) => state.product);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const { imageUrl, imageUpload } = useImage();

  const categoriesList = [
    { categoryId: 1, categoryName: 'Category 1' },
    { categoryId: 2, categoryName: 'Category 2' },
  ];

  const handleRegisterProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title && categoryId) {
      dispatch(registerProduct({
        title: title,
        note: note,
        image_url: imageUrl,
        category_id: categoryId
      }));
    }
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNote(e.target.value));
  };

  const handleChangeCategoryId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategoryId(Number(e.target.value)));
  };

  return {
    title,
    note,
    categoryId,
    imageUrl,
    fileInput,
    categoriesList,
    handleRegisterProduct,
    handleChangeTitle,
    handleChangeDescription,
    handleChangeCategoryId,
    imageUpload,
  };
};