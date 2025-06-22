import React from 'react';
import { CartButton } from '../../features/cart/components/cartbutton.jsx';
import { Cart } from '../../features/cart/components/cart.jsx';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#ffcc00', fontFamily: "'Bangers', cursive" }}>
      <div className="container">
<a className="navbar-brand" href="#" style={{ color: '#d32f2f', fontSize: '2rem', marginRight: '2rem' }}>
          GUARANI Foods
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link fw-bold" href="#home" style={{ color: '#d32f2f' }}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-bold" href="#productos" style={{ color: '#d32f2f' }}>Products</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-bold" href="#contacto" style={{ color: '#d32f2f' }}>Contact</a>
            </li>
          </ul>
          <CartButton />
          <Cart />
        </div>
      </div>
    </nav>
  );
};

export default Header;
