import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import LandingPage from './LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Creator from './Creator/Creator';
import MarketPlace from './Marketplace/Marketplace';
import Register from './Register';
import axios from 'axios';
import ProductContext from "./ProductStore/ProductContext"

const App = () => {
  const [product, setProducts] = useState({ products: [], search: "" });

  const fetchProducts = async (search) => {
    const response = await axios.post("/server/products", { search: search });
    setProducts({ products: response.data, search: search });
  };

  const fetchProductbyId = async (id) => {
   
      const response = await axios.post("/server/productsbyId", { search: id });
      return response.data.products
      
  };

  useEffect(() => {
    const storedProducts = sessionStorage.getItem("products");
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        setProducts(parsedProducts);
      } catch (error) {
        console.error("Failed to parse products from sessionStorage:", error);
        // If parsing fails, we keep the initial state
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("products", JSON.stringify(product));
  }, [product]);

  return (
    <ProductContext.Provider value={{ product, fetchProducts, fetchProductbyId }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<><LandingPage /> <Footer /></>} />
          <Route path='register' element={<Register />} />
          <Route path='/creators/*' element={<Creator />} />
          <Route path='/marketplace/*' element={<MarketPlace />} />
          <Route path='/*' element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </ProductContext.Provider>
  );
};

export default App;