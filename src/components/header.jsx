import React from 'react';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#ffcc00', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: "'Bangers', cursive" }}>
      <h1 style={{ color: '#d32f2f', fontSize: '2rem' }}>GUARANI Foods</h1>
      <nav>
        <a href="#home" style={{ margin: '0 10px', color: '#d32f2f', textDecoration: 'none', fontWeight: 'bold' }}>Home</a>
        <a href="#productos" style={{ margin: '0 10px', color: '#d32f2f', textDecoration: 'none', fontWeight: 'bold' }}>Products</a>
        <a href="#contacto" style={{ margin: '0 10px', color: '#d32f2f', textDecoration: 'none', fontWeight: 'bold' }}>Contact</a>
      </nav>
    </header>
  );
};

export default Header;
