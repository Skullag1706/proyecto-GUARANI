import React, { createContext, useState, useEffect } from "react";

const ProductsContext = createContext();

export const FoodProvider = ({ children }) => {
  const [products, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        return response.json();
      })
      .then(data => {
        const filteredProducts = data.products.filter(product => product.category === "groceries");
        const mappedFoods = filteredProducts.map(product => ({
          id: product.id,
          imageUrl: product.thumbnail,
          name: product.title,
          description: product.description,
        }));
        const limitedFoods = mappedFoods.slice(0, 10); // Limit to 10 products
        setFoods(limitedFoods);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
