import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ 
  products, 
  filteredProducts, 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  onOpenAddModal, 
  onSelectProduct, 
  onDeleteProduct 
}) {
  return (
    <div className="list-container" style={{ width: '100%', padding: '20px 40px', boxSizing: 'border-box' }}>
      {}
      <section className="section-block" style={{ marginBottom: '40px' }}>
        <h2 className="section-title" style={{ color: '#ffb74d', marginBottom: '20px', fontSize: '1.6rem' }}>
          Featured Coffee
        </h2>
        <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
          {products.slice(0, 5).map(product => (
            <ProductCard 
              key={`feat-${product.id}`} 
              product={product} 
              onClick={() => onSelectProduct(product)} 
            />
          ))}
        </div>
      </section>

      {}
      <section className="section-block">
        <div className="list-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="section-title" style={{ color: '#ffb74d', fontSize: '1.6rem', margin: 0 }}>
            Product List
          </h2>
          <div className="list-controls-right" style={{ display: 'flex', gap: '12px' }}>
            <select 
              className="category-select" 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ padding: '8px 14px', background: '#3e2723', color: '#fff', border: '1px solid #5d4037', borderRadius: '6px', cursor: 'pointer' }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button 
              className="add-new-btn" 
              onClick={onOpenAddModal} 
              style={{ background: '#ffb74d', color: '#2b1810', border: 'none', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              + Add New
            </button>
          </div>
        </div>

        <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => onSelectProduct(product)} 
                onDelete={onDeleteProduct} 
              />
            ))
          ) : (
            <div className="no-products" style={{ color: '#bcaaa4', gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
              Walang nahanap na kape.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProductList;