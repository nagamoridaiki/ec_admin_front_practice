"use client";

import React from 'react';
import { useProductRegistTemplates } from './useProductRegistTemplates';
import { useRouter } from 'next/router';
import { FaHome, FaShoppingCart, FaUserCircle } from 'react-icons/fa';

interface User {
  name: string;
}

interface InputFormProps {
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Header: React.FC<{ user: User }> = ({ user }) => (
  <header>
    <h1>Welcome, {user.name}</h1>
  </header>
);

const InputForm: React.FC<InputFormProps> = ({ type, value, placeholder, onChange, required }) => (
  <input
    type={type}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    required={required}
    className="w-full p-2 border border-gray-300 rounded"
  />
);

export const ProductRegistTemplate: React.FC = () => {
  const {
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
  } = useProductRegistTemplates();

  const navigateToTop = () => {
    window.location.href = '/';
  };

  return (
    <div className="app">
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
        <FaHome
          style={{ position: 'absolute', left: '20px', cursor: 'pointer', fontSize: '2rem' }}
          onClick={navigateToTop}
        />
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Receipt Products</h1>
      </header>

      <div className="product-registration-container p-4">
        <h1 className="text-2xl font-bold mb-4">Product Registration</h1>
        <form className="product-registration-form space-y-4" onSubmit={handleRegisterProduct}>
          <div className="form-group">
            <label htmlFor="productName" className="block mb-2">Product Name:</label>
            <InputForm type="text" value={title} placeholder="title" onChange={handleChangeTitle} required />
          </div>

          <div className="form-group">
            <label htmlFor="productNote" className="block mb-2">Product Note:</label>
            <InputForm type="text" value={note} placeholder="note" onChange={handleChangeDescription} />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="block mb-2">Category:</label>
            <select id="category" value={categoryId} onChange={handleChangeCategoryId} required className="w-full p-2 border border-gray-300 rounded">
              <option value="">Select a category</option>
              {categoriesList.map(category => (
                <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="block mb-2">File:</label>
            <input type="file" ref={fileInput} onChange={imageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            {imageUrl && <img src={imageUrl} alt="Uploaded Product" className="mt-4" />}
          </div>

          <button type="submit" className="submit-button bg-blue-500 text-white py-2 px-4 rounded">Register Product</button>
        </form>
        {showPopup && (
        <div className="popup">
          商品が正常に登録されました！
        </div>
      )}
      </div>
    </div>
  );
}
