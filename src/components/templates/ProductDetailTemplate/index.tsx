"use client";

import React, { useState, useCallback, useEffect, CSSProperties } from 'react';
import { useProductDetailTemplates } from './useProductDetailTemplate';
import { FaHome, FaArrowCircleLeft } from 'react-icons/fa';

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: '#f3f4f6',
  borderBottom: '2px solid #d1d5db',
  justifyContent: 'space-between'
};

const iconStyle: CSSProperties = {
  cursor: 'pointer',
  fontSize: '24px',
  marginRight: '10px'
};

const arrowStyle: CSSProperties = {
  cursor: 'pointer',
  fontSize: '24px',
  marginLeft: '10px'
};

const containerStyle: CSSProperties = {
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const imageStyle: CSSProperties = {
  width: '200px',
  height: 'auto',
  marginBottom: '20px'
};

const titleStyle: CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '8px',
  textAlign: 'center'
};

const noteStyle: CSSProperties = {
  color: '#4b5563',
  marginBottom: '20px',
  width: '30%',
  textAlign: 'center'
};

const tableStyle: CSSProperties = {
  width: '100%',
  maxWidth: '600px',
  marginBottom: '20px',
  borderCollapse: 'collapse'
};

const thStyle: CSSProperties = {
  textAlign: 'left' as 'left',
  borderBottom: '1px solid #d1d5db',
  padding: '8px'
};

const tdStyle: CSSProperties = {
  padding: '8px',
  borderBottom: '1px solid #d1d5db'
};

const inputStyle: CSSProperties = {
  border: '1px solid #d1d5db',
  padding: '4px',
  width: '100px',
  marginLeft: '10px'
};

const buttonStyle: CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  alignSelf: 'center'
};

const Header: React.FC<{ onNavigateToTop: () => void }> = ({ onNavigateToTop }) => (
  <header style={headerStyle}>
    <FaHome style={iconStyle} onClick={onNavigateToTop} />
    <FaArrowCircleLeft style={arrowStyle} onClick={() => window.location.href = 'http://localhost:4000/pages/InventoryManagementPage'} />
  </header>
);

export const ProductDetailTemplate: React.FC<{ productId: number }> = ({productId}) => {

  const { product, navigateToTop, handleUpdateClick, handleInputChange } = useProductDetailTemplates(productId);

  return (
    <div>
      <Header onNavigateToTop={navigateToTop} />
      {product && product.inventories && (
          <div style={containerStyle}>
              <img src={product.imageUrl} alt={product.title} style={imageStyle} />
              <h2 style={titleStyle}>{product.title}</h2>
              <textarea style={{ ...noteStyle, resize: 'none' }} defaultValue={product.note}></textarea>
              <div>
                  <table style={tableStyle}>
                      <thead>
                          <tr>
                              <th style={thStyle}>状態</th>
                              <th style={thStyle}>価格</th>
                              <th style={thStyle}>在庫数</th>
                          </tr>
                      </thead>
                      <tbody>
                          {['S', 'A', 'B', 'C'].map((rank, index) => {
                              const inventory = product?.inventories?.find(inv => inv.rank === rank) || { price: '', inventoryNum: '' };
                              return (
                                  <tr key={index}>
                                      <td style={tdStyle}>{`状態${rank}: `}</td>
                                      <td style={tdStyle}>
                                          <div style={{ display: 'flex', alignItems: 'center' }}>
                                              <span style={{ minWidth: '80px', display: 'inline-block', textAlign: 'right' }}>{inventory.price} 円</span>
                                              <span>{`=>`}</span>
                                              <input
                                                  type="text"
                                                  style={inputStyle}
                                                  defaultValue={inventory.price}
                                                  onChange={(e) => handleInputChange(rank as 'S' | 'A' | 'B' | 'C', 'price', Number(e.target.value))}
                                              />
                                              <span> 円</span>
                                          </div>
                                      </td>
                                      <td style={tdStyle}>
                                          <div style={{ display: 'flex', alignItems: 'center' }}>
                                              <span style={{ minWidth: '80px', display: 'inline-block', textAlign: 'right' }}>{inventory.inventoryNum}</span>
                                              <span>{`=>`}</span>
                                              <input
                                                  type="text"
                                                  style={inputStyle}
                                                  defaultValue={inventory.inventoryNum}
                                                  onChange={(e) => handleInputChange(rank as 'S' | 'A' | 'B' | 'C', 'inventoryNum', Number(e.target.value))}
                                              />
                                          </div>
                                      </td>
                                  </tr>
                              );
                          })}
                      </tbody>
                  </table>
              </div>
              <button style={buttonStyle} onClick={handleUpdateClick}>更新確認</button>
          </div>
      )}
    </div>
  )
}

