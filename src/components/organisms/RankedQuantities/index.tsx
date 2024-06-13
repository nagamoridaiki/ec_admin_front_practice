"use client";

import React from 'react';

interface RankedQuantitiesProps {
  product: any;
  inputValues: { [key: string]: number };
  onInputChange: (productId: number, rank: string, value: number) => void;
}

const RankedQuantities: React.FC<RankedQuantitiesProps> = ({ product, inputValues, onInputChange }) => {
  const handleNavigation = (productId: number) => {
    window.location.href = `http://localhost:4000/ProductDetail/${productId}`;
  };

  return (
    <li style={styles.productItem}>
      <img
        src={product.imageUrl}
        alt={product.title}
        style={styles.productImage}
        onClick={() => handleNavigation(product.productId)}
      />
      <h2 style={styles.productTitle} onClick={() => handleNavigation(product.productId)}>
        {product.title}
      </h2>
      <div style={styles.productRanks}>
        {['S', 'A', 'B', 'C'].map((rank) => {
          const inventory = product.inventories?.find((inv: any) => inv.rank === rank) || { rank, inventoryNum: 0 };
          const inputValue = inputValues[`${product.productId}-${rank}`] || inventory.inventoryNum;

          return (
            <div key={rank} style={styles.rankContainer}>
              <div style={styles.rankLabelContainer}>
                <span style={styles.rankLabel}>状態{inventory.rank}:</span>
                <div style={styles.rankInputContainer}>
                  <span>{inventory.inventoryNum}</span>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => onInputChange(product.productId, rank, Number(e.target.value))}
                    style={{
                      ...styles.rankInput,
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
};

const styles = {
  productItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '20px',
    border: '1px solid #dee2e6',
    padding: '10px',
    borderRadius: '5px'
  } as React.CSSProperties,
  productImage: {
    marginRight: '10px',
    width: '50px',
    height: '50px'
  } as React.CSSProperties,
  productTitle: {
    fontSize: '1.2rem',
    flex: '0.9'
  } as React.CSSProperties,
  productRanks: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  } as React.CSSProperties,
  rankContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '10px'
  } as React.CSSProperties,
  rankLabelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  } as React.CSSProperties,
  rankLabel: {
    marginRight: '5px'
  } as React.CSSProperties,
  rankInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '0px'
  } as React.CSSProperties,
  rankInput: {
    marginTop: '5px',
    width: '50px',
    textAlign: 'center',
    marginLeft: '15px'
  } as React.CSSProperties
};

export default RankedQuantities;
