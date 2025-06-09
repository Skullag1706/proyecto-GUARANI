import React, { useContext, useState } from 'react';
import ProductsContext from './ProductsContext.jsx';
import Spinner from './Spinner.jsx';
import Swal from 'sweetalert2';

const Main = () => {
  const { products, loading, error } = useContext(ProductsContext);
  const [quantities, setQuantities] = useState(() => {
    const initialQuantities = {};
    products.forEach(product => {
      initialQuantities[product.id] = 0;
    });
    return initialQuantities;
  });

  const increment = (id) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      if (current < 99) {
        return { ...prev, [id]: current + 1 };
      }
      return prev;
    });
  };

  const decrement = (id) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      if (current > 0) {
        return { ...prev, [id]: current - 1 };
      }
      return prev;
    });
  };

  const handleBuy = (product) => {
    const quantity = quantities[product.id] || 0;
    if (quantity > 0) {
      Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: `Se agregó el producto "${product.name}" con cantidad ${quantity} al carrito.`,
        confirmButtonColor: '#d32f2f',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Producto no seleccionado',
        confirmButtonColor: '#d32f2f',
      });
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#111' }}>
      <Spinner />
    </div>
  );
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>;

  return (
    <main style={{ padding: '20px', fontFamily: "'Bangers', cursive", backgroundColor: '#111', color: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>GUARANI Products</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {products.map(product => (
          <div key={product.id} style={{ backgroundColor: '#222', borderRadius: '8px', padding: '15px', width: '250px', boxShadow: '0 0 10px #d32f2f' }}>
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', borderRadius: '8px' }} />
            <h3 style={{ marginTop: '15px' }}>{product.name}</h3>
            <p>{product.description || 'Sin descripción disponible'}</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', gap: '10px' }}>
              <button
                onClick={() => decrement(product.id)}
                style={{ backgroundColor: '#555', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
              >
                -
              </button>
              <span style={{ color: '#fff', minWidth: '20px', textAlign: 'center' }}>{quantities[product.id] || 0}</span>
              <button
                onClick={() => increment(product.id)}
                style={{ backgroundColor: '#d32f2f', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
              >
                +
              </button>
            </div>
            <button
              onClick={() => handleBuy(product)}
              style={{ backgroundColor: '#d32f2f', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px', width: '100%' }}
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Main;
