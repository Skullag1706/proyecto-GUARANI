import React, { useContext, useState } from 'react';
import ProductsContext from '../context/ProductsContext.jsx';
import Spinner from '../../../shared/components/Spinner.jsx';
import { useCart } from "../../cart/hooks/cartcontext";
import Swal from 'sweetalert2';
import '../../../shared/styles/style.css';

const Main = () => {
  const { products, loading, error } = useContext(ProductsContext);
  const { addItem } = useCart();
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
        title: 'Gracias por su compra',
        text: `Gracias por su compra del producto "${product.name}" con cantidad ${quantity}.`,
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

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 0;
    if (quantity > 0) {
      addItem({ 
        id: product.id, 
        title: product.name, 
        price: product.price, 
        quantity, 
        image: product.imageUrl 
      });
      Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: `El producto "${product.name}" se ha agregado al carrito.`,
        confirmButtonColor: '#1976d2',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Producto no seleccionado',
        confirmButtonColor: '#1976d2',
      });
    }
  };

  if (loading) return (
    <div className="loading-container">
      <Spinner />
    </div>
  );
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <main className="main-container">
      <h2 className="main-title">GUARANI Products</h2>
      <div className="products-wrapper">
        {products.map(product => (
          <div key={product.id} className="product-card card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
<p className="product-price" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
  {product.price !== undefined ? `$${product.price.toFixed(2)}` : 'Precio no disponible'}
</p>
            <p className="product-description">{product.description || 'Sin descripción disponible'}</p>
            <div className="quantity-controls">
              <button
                onClick={() => decrement(product.id)}
                className="quantity-button decrement"
                aria-label={`Disminuir cantidad de ${product.name}`}
              >
                -
              </button>
              <span className="quantity-display">{quantities[product.id] || 0}</span>
              <button
                onClick={() => increment(product.id)}
                className="quantity-button increment"
                aria-label={`Aumentar cantidad de ${product.name}`}
              >
                +
              </button>
            </div>
            <div className="product-actions">
              <button
                onClick={() => handleBuy(product)}
                className="buy-button"
              >
                Comprar
              </button>
              <button
                onClick={() => handleAddToCart(product)}
                className="add-to-cart-button"
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Main;
