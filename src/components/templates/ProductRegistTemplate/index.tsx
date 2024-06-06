"use client";

import React, { useRef, useState } from 'react';
import styles from './styles.module.css';

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

const DropdownMenu: React.FC = () => (
  <div className="dropdown-menu">
    <ul>
      <li>Menu Item 1</li>
      <li>Menu Item 2</li>
      <li>Menu Item 3</li>
    </ul>
  </div>
);

export const ProductRegistTemplate: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>('');
  const fileInput = useRef<HTMLInputElement | null>(null);
  const categoriesList = [
    { categoryId: 1, categoryName: 'Category 1' },
    { categoryId: 2, categoryName: 'Category 2' },
    // Add more categories as needed
  ];

  const handleDocumentClick = () => {
    setMenuVisible(!menuVisible);
  };

  const handleRegisterProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle product registration logic here
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const handleChangeCategoryId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(e.target.value);
  };

  const imageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="app" onClick={handleDocumentClick}>
      <Header user={{ name: 'User' }} />

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
        {menuVisible && <DropdownMenu />}
      </div>
    </div>
  );
}
