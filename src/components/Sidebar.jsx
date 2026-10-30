import React from 'react';

function Sidebar({ onShopNow }) {
  return (
    <aside style={{
      background: '#231510',
      border: '1px solid #3e2723',
      borderRadius: '20px',
      margin: '0 40px 30px 40px',
      padding: '40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '500px' }}>
        <h1 style={{ fontSize: '2.8rem', color: '#ffb74d', marginBottom: '16px', fontWeight: 'bold' }}>
          Brewed to Perfection
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#bcaaa4', marginBottom: '24px', lineHeight: '1.6' }}>
          Discover our freshly crafted artisan coffees made to energize your day with rich and aromatic flavors.
        </p>
        <button 
          onClick={onShopNow}
          style={{
            background: '#ffb74d',
            color: '#231510',
            border: 'none',
            padding: '12px 24px',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(255, 183, 77, 0.3)'
          }}
        >
          Shop Now →
        </button>
      </div>

      <div style={{
        background: '#321d15',
        border: '1px solid #4e342e',
        borderRadius: '16px',
        padding: '12px',
        width: '420px',
        height: '260px',
        overflow: 'hidden',
        boxShadow: '0 8px 20px rgba(0,0,0,0.6)'
      }}>
        <img 
          src="/photodesgn.jpg" 
          alt="Coffee Design Banner" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} 
        />
      </div>
    </aside>
  );
}

export default Sidebar;