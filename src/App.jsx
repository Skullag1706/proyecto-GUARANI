import React from 'react';
import Header from './components/header.jsx';
import Main from './components/main.jsx';
import Footer from './components/footer.jsx';
import { FoodProvider } from './components/ProductsContext.jsx';

const App = () => (
  <FoodProvider>
    <Header />
    <Main />
    <Footer />
  </FoodProvider>
);

export default App;
