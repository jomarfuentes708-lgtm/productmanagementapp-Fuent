import React, { useState } from 'react';

function AddProduct({ isOpen, onClose, onAddProduct }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Coffee');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('10'); 
  const [rating, setRating] = useState('4.5');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [specifications, setSpecifications] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) {
      alert('Pakilagay ang pangalan at presyo ng produkto!');
      return;
    }

    const newProd = {
      id: Date.now(),
      name,
      category,
      price: Number(price),
      stock: Number(stock) || 10,
      rating: Number(rating) || 4.5,
      image: image ? (image.startsWith('http') || image.startsWith('/') ? image : `/${image}`) : '/. Cafe Latte.jpg',
      description: description || 'Freshly brewed coffee.',
      specifications: specifications || 'Size: Regular | Fresh Blend'
    };

    onAddProduct(newProd);
    onClose();

    // Reset fields
    setName('');
    setCategory('Coffee');
    setPrice('');
    setStock('10');
    setImage('');
    setDescription('');
    setSpecifications('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 3000
    }}>
      <div className="add-modal-box" onClick={(e) => e.stopPropagation()} style={{
        background: '#231510',
        border: '1.5px solid #ffb74d',
        borderRadius: '12px',
        width: '520px',
        maxWidth: '92%',
        padding: '24px 28px',
        color: '#fff',
        boxShadow: '0 12px 36px rgba(0,0,0,0.9)'
      }}>
        <h2 style={{ color: '#ffb74d', marginTop: 0, marginBottom: '18px', fontSize: '1.35rem', fontWeight: 'bold' }}>
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: '#bcaaa4', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Product Name</label>
            <input 
              type="text" 
              placeholder="e.g. Spanish Latte" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', background: '#321d15', border: '1px solid #4e342e', borderRadius: '6px', color: '#fff', boxSizing: 'border-box', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: '#bcaaa4', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Category</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', background: '#321d15', border: '1px solid #4e342e', borderRadius: '6px', color: '#fff', boxSizing: 'border-box', outline: 'none' }}
            >
              <option value="Coffee">Coffee</option>
              <option value="Frappe">Frappe</option>
              <option value="Cold Brew">Cold Brew</option>
              <option value="Specialty">Specialty</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.8rem', color: '#bcaaa4', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Price (₱)</label>
              <input 
                type="number" 
                placeholder="0" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', background: '#321d15', border: '1px solid #4e342e', borderRadius: '6px', color: '#fff', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.8rem', color: '#bcaaa4', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Quantity / Stock</label>
              <input 
                type="number" 
                placeholder="10" 
                value={stock} 
                onChange={(e) => setStock(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', background: '#321d15', border: '1px solid #4e342e', borderRadius: '6px', color: '#fff', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.8rem', color: '#bcaaa4', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Rating (1-5)</label>
              <input 
                type="text" 
                placeholder="4.5" 
                value={rating} 
                onChange={(e) => setRating(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', background: '#321d15', border: '1px solid #4e342e', borderRadius: '6px', color: '#fff', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.8rem', color: '#bcaaa4', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Image File Path or URL</label>
              <input 
                type="text" 
                placeholder="e.g. /Spanish Latte.jpg or URL" 
                value={image} 
                onChange={(e) => setImage(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', background: '#321d15', border: '1px solid #4e342e', borderRadius: '6px', color: '#fff', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: '#bcaaa4', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Description</label>
            <textarea 
              rows="2" 
              placeholder="Brief description..." 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', background: '#321d15', border: '1px solid #4e342e', borderRadius: '6px', color: '#fff', boxSizing: 'border-box', resize: 'none', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: '#bcaaa4', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Specifications</label>
            <input 
              type="text" 
              placeholder="Specs..." 
              value={specifications} 
              onChange={(e) => setSpecifications(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', background: '#321d15', border: '1px solid #4e342e', borderRadius: '6px', color: '#fff', boxSizing: 'border-box', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
            <button 
              type="button" 
              onClick={onClose} 
              style={{ background: '#3e2723', color: '#d7ccc8', border: '1px solid #4e342e', padding: '9px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={{ background: '#ffb74d', color: '#2b1810', border: 'none', padding: '9px 22px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;