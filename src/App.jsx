import React, { useState, useRef, useMemo } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import { initialProducts } from './data/products';
import './App.css';

function App() {
  const [products, setProducts] = useState(Array.isArray(initialProducts) ? initialProducts : []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const [cartItems, setCartItems] = useState([]);
  const productListRef = useRef(null);

  const categories = useMemo(
    () => ['All', ...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);

      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const scrollToProducts = () => {
    productListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleOpenProductDetail = (product) => {
    setSelectedProduct(product);
  };


  const handleIncreaseQty = () => {
    if (!selectedProduct) return;
    const newStock = Number(selectedProduct.stock || 0) + 1;
    

    setSelectedProduct(prev => ({ ...prev, stock: newStock }));
    

    setProducts(prev => prev.map(p => p.id === selectedProduct.id ? { ...p, stock: newStock } : p));
  };

  const handleDecreaseQty = () => {
    if (!selectedProduct) return;
    const newStock = Math.max(1, Number(selectedProduct.stock || 0) - 1);
    

    setSelectedProduct(prev => ({ ...prev, stock: newStock }));
    

    setProducts(prev => prev.map(p => p.id === selectedProduct.id ? { ...p, stock: newStock } : p));
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    const qtyToAdd = Number(selectedProduct.stock || 1);

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(item => item.id === selectedProduct.id);
      if (existingItemIndex > -1) {
        const updated = [...prevItems];
        updated[existingItemIndex].quantity += qtyToAdd;
        return updated;
      } else {
        return [...prevItems, { ...selectedProduct, quantity: qtyToAdd }];
      }
    });

    alert(`${qtyToAdd}x ${selectedProduct.name} added to cart!`);
    setSelectedProduct(null);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

 
  const isModalLowStock = selectedProduct && Number(selectedProduct.stock) < 5;

  return (
    <div className="app-container" style={{ background: '#1a0f0a', minHeight: '100vh', width: '100%', boxSizing: 'border-box' }}>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onScrollToProducts={scrollToProducts}
        cartCount={totalCartCount}
      />

      <main className="main-content" style={{ paddingBottom: '50px' }}>
        <Sidebar onShopNow={scrollToProducts} />

        <div ref={productListRef}>
          <ProductList
            products={products}
            filteredProducts={filteredProducts}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onSelectProduct={handleOpenProductDetail}
            onDeleteProduct={(id) => setProducts(products.filter(p => p.id !== id))}
          />
        </div>
      </main>

      {}
      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
          <div className="modal-detail-box" onClick={(e) => e.stopPropagation()} style={{ background: '#231510', border: '1px solid #ffb74d', padding: '28px', borderRadius: '12px', width: '580px', maxWidth: '90%', color: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.9)' }}>
            <div className="modal-detail-grid" style={{ display: 'flex', gap: '20px' }}>
              <div className="modal-img-container" style={{ position: 'relative', width: '220px', height: '220px', flexShrink: 0 }}>
                {isModalLowStock && (
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#d32f2f', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', zIndex: 2 }}>
                    LOW STOCK
                  </span>
                )}
                <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
              </div>

              <div className="modal-detail-info" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', marginBottom: '6px', color: '#fff' }}>{selectedProduct.name}</h2>
                  <p style={{ fontSize: '0.85rem', color: '#bcaaa4', marginBottom: '10px' }}>
                    Category: <span>[{selectedProduct.category}]</span> ⭐ {selectedProduct.rating || '4.7'}
                  </p>
                  <p style={{ fontSize: '0.88rem', marginBottom: '10px', color: '#d7ccc8' }}>{selectedProduct.description}</p>
                  {selectedProduct.specifications && (
                    <p style={{ fontSize: '0.8rem', color: '#a1887f', marginBottom: '12px' }}>{selectedProduct.specifications}</p>
                  )}
                  <p style={{ fontSize: '1.25rem', color: '#ffb74d', fontWeight: 'bold', marginBottom: '12px' }}>₱{selectedProduct.price ? Number(selectedProduct.price).toLocaleString() : 0}</p>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <label style={{ fontSize: '0.9rem' }}>Quantity:</label>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #4e342e', borderRadius: '4px', overflow: 'hidden' }}>
                      <button type="button" onClick={handleDecreaseQty} style={{ background: '#321d15', color: '#fff', border: 'none', padding: '4px 12px', cursor: 'pointer', fontSize: '1rem' }}>-</button>
                      <span style={{ padding: '0 14px', background: '#231510', fontSize: '0.95rem' }}>{selectedProduct.stock}</span>
                      <button type="button" onClick={handleIncreaseQty} style={{ background: '#321d15', color: '#fff', border: 'none', padding: '4px 12px', cursor: 'pointer', fontSize: '1rem' }}>+</button>
                    </div>
                  </div>

                  <div style={{ marginBottom: '14px', fontSize: '0.95rem' }}>
                    Subtotal: <strong>₱{((selectedProduct.price || 0) * selectedProduct.stock).toLocaleString()}</strong>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={handleAddToCart}
                      style={{ flex: 1, background: '#ffb74d', color: '#2b1810', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      style={{ background: '#4e342e', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {}
      <AddProduct
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}

export default App;