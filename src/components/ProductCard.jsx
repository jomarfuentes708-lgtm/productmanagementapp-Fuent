import React from 'react';

function ProductCard({ product, onClick }) {
 
  const isLowStock = product?.stock !== undefined && Number(product.stock) < 5;

  return (
    <div 
      className={`product-card ${isLowStock ? 'low-stock' : ''}`} 
      onClick={onClick}
      style={{ background: '#2b1810', border: '1px solid #3e2723', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px', color: '#fff', cursor: 'pointer', transition: 'transform 0.2s' }}
    >
      <div className="card-image-wrapper" style={{ position: 'relative', width: '100%', height: '180px', background: '#1a0f0a', borderRadius: '10px', overflow: 'hidden' }}>
        {isLowStock && (
          <span style={{ position: 'absolute', top: '10px', right: '10px', background: '#d32f2f', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', zIndex: 2 }}>
            LOW STOCK
          </span>
        )}
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="card-info">
        <h3 style={{ fontSize: '1.05rem', margin: '0 0 6px 0', color: '#fff' }}>{product.name}</h3>
        <p className="price" style={{ color: '#ffb74d', fontWeight: 'bold', fontSize: '1rem', margin: 0 }}>₱{product.price ? product.price.toLocaleString() : 0}</p>
      </div>
    </div>
  );
}

export default ProductCard;