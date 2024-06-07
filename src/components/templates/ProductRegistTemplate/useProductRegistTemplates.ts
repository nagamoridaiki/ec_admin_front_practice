import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { setTitle, setNote, setCategoryId, setImageUrl, registerProduct } from '@/app/features/productSlice';
import { setCategories, fetchCategoriesList } from '@/app/features/categorySlice';
import { useRef, useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NAVIGATION_PATH } from '@/constants/navigation';
import { useImage } from '@/hooks/useImage'


export const useProductRegistTemplates = () => {

  const dispatch: AppDispatch = useDispatch();
  const { title, note, categoryId } = useSelector((state: RootState) => state.product);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const { imageUrl, imageUpload } = useImage();
  const [showPopup, setShowPopup] = useState(false);

  const categoriesList = useSelector((state: RootState) => state.category.categories);

  const handleRegisterProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title && categoryId) {
      dispatch(registerProduct({
        title: title,
        note: note,
        image_url: imageUrl,
        category_id: categoryId
      })).then((action) => {
        if (registerProduct.fulfilled.match(action)) {
          const result = unwrapResult(action);
          console.log('Product registered successfully:', result);
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 3000);
          window.location.href = NAVIGATION_PATH.TOP;
        }
      });
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


  useEffect(() => {
    dispatch(fetchCategoriesList());
  }, [dispatch]);


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
    showPopup
  };
};