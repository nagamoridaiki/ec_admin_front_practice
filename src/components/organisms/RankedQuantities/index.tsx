"use client";

import React from 'react';

const RankedQuantities: React.FC<{
  product: any;
  inputValues: { [key: string]: number };
  onInputChange: (productId: number, rank: string, value: number) => void;
}> = ({ product, inputValues, onInputChange }) => (
  <li style={productItemStyle}>
    <img src={product.imageUrl} alt={product.title} style={productImageStyle} />
    <h2 style={productTitleStyle}>{product.title}</h2>
    <div style={productRanksStyle}>
      {['S', 'A', 'B', 'C'].map((rank, index) => {
        const inventory = product.inventories?.find((inv: any) => inv.rank === rank) || { rank, inventoryNum: 0 };
        const inputValue = inputValues[`${product.productId}-${rank}`] || inventory.inventoryNum;

        return (
          <div key={index} style={rankContainerStyle}>
            <div style={rankLabelContainerStyle}>
              <span style={rankLabelStyle}>状態{inventory.rank}:</span>
              <div style={rankInputContainerStyle}>
                <span>{inventory.inventoryNum}</span>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => onInputChange(product.productId, rank, Number(e.target.value))}
                  style={{
                    ...rankInputStyle,
                    backgroundColor: inputValue !== inventory.inventoryNum ? 'yellow' : 'white'
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </li>
);


const productItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: '20px',
  border: '1px solid #dee2e6',
  padding: '10px',
  borderRadius: '5px'
};

const productImageStyle: React.CSSProperties = {
  marginRight: '10px',
  width: '50px',
  height: '50px'
};

const productTitleStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  flex: '0.9'
};

const productRanksStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
};

const rankContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginRight: '10px'
};

const rankLabelContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
};

const rankLabelStyle: React.CSSProperties = {
  marginRight: '5px'
};

const rankInputContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginRight: '0px'
};

const rankInputStyle: React.CSSProperties = {
  marginTop: '5px',
  width: '50px',
  textAlign: 'center',
  marginLeft: '15px'
};


export default RankedQuantities;
