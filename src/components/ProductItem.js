import React, { useState } from 'react';

function ProductItem({ product, products, setProducts }) {
  const [editMode, setEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState(product?.description || '');
  const [editedPhoto, setEditedPhoto] = useState(product?.photo || '');

  const handleEdit = () => {
    setEditMode(true);
    setEditedDescription(product?.description || '');
    setEditedPhoto(product?.photo || '');
  };

  const handleSave = () => {
    const updatedProduct = { ...product, description: editedDescription, photo: editedPhoto };
    const updatedProducts = products.map(p => (p.id === product.id ? updatedProduct : p));
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleDelete = () => {
    const updatedProducts = products.filter(p => p.id !== product.id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleChangeDescription = (e) => {
    setEditedDescription(e.target.value);
  };

  const handleChangePhoto = (e) => {
    setEditedPhoto(e.target.value);
  };

  return (
    <div className="product-item">
      {!editMode ? (
        <div>
          <img src={product.photo} alt={product.description} />
          <p>{product.description}</p>
          <div>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={editedDescription}
            onChange={handleChangeDescription}
            placeholder="Enter product description"
          />
          <input
            type="text"
            value={editedPhoto}
            onChange={handleChangePhoto}
            placeholder="Enter product photo URL"
          />
          <div>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductItem;
