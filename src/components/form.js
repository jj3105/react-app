import React, { useState, useEffect } from 'react';

function Form({ products, setProducts }) {
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, [setProducts]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editMode && editId !== null) {
      // Edit existing product
      const updatedProducts = products.map(p => (p.id === editId ? { ...p, description, photo } : p));
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setEditMode(false);
      setEditId(null);
    } else {
      // Add new product
      const newProduct = {
        id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
        description,
        photo,
        is_completed: false // Adjust as per your needs
      };
      setProducts([...products, newProduct]);
      localStorage.setItem('products', JSON.stringify([...products, newProduct]));
    }

    // Reset form fields
    setDescription('');
    setPhoto('');
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditId(null);
    setDescription('');
    setPhoto('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        name="description"
        placeholder="Enter product description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label htmlFor="photo">Photo URL:</label>
      <input
        type="text"
        id="photo"
        name="photo"
        placeholder="Enter product photo URL"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
        required
      />

      {editMode ? (
        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <button type="submit">Add Product</button>
      )}
    </form>
  );
}

export default Form;
