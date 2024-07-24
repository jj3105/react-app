import React, { useState, useEffect } from 'react';
import './styles/styles.css';
import Header from './components/header';
import Form from './components/form';
import ProductList from './components/ProductList';

function App() {
  const [products, setProducts] = useState([]);

  // Load products from localStorage on initial render
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <Form products={products} setProducts={setProducts} />
      <ProductList products={products} setProducts={setProducts} />
    </div>
  );
}

export default App;
