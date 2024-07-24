import React from 'react';
import ProductItem from './ProductItem';

function ProductList({ products, setProducts }) {
  return (
    <div className="product-list">
      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductItem key={product.id} product={product} products={products} setProducts={setProducts} />
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}

export default ProductList;
