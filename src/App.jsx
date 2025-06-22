import React from 'react';
import Header from './shared/components/header.jsx';
import Main from './features/products/components/main.jsx';
import Footer from './shared/components/footer.jsx';
import { FoodProvider } from './features/products/context/ProductsContext.jsx';
import { CartProvider } from './features/cart/hooks/cartcontext.jsx';
import { Cart } from './features/cart/components/cart.jsx';
import { CartButton } from './features/cart/components/cartbutton.jsx';

const App = () => (
  <FoodProvider>
    <CartProvider>
      <Header />
      {/* Removed CartButton outside header */}
      <Main />
      {/* Removed Cart component to show only cart in header */}
      <Footer />
    </CartProvider>
  </FoodProvider>
);

export default App;
