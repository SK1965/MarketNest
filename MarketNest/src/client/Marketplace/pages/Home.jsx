import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import HomePage from "./HomePage";
import Footer from "../../Footer";
import MyProducts from "./MyProducts";
import Profile from "./Profile";
import { motion } from "framer-motion";
import ProductPage from "./ProductPage";
import Product from "./Products";
import CartPage from "./CartPage";
export default function Home(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700">
        <div className="fixed  w-screen px-1 z-10">
     <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
     </div>
     
     <div className=" pt-24">
      {/* Main Content */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
      <Routes>
        <Route path="cart" element={<CartPage/>}/>
        <Route path="home" element={<HomePage/>} />  
        <Route path="productpage" element={<ProductPage/>}/>
        <Route path="templates" element={<Product/>}/>
        <Route path="designs" element={<Product/>}/>
        <Route path="cards" element={<Product/>}/>
        <Route path="products" element ={<Product/>}/>
        <Route path="templates/*" element={<ProductPage/>}/>
        <Route path="designs/*" element={<ProductPage/>}/>
        <Route path="cards/*" element={<ProductPage/>}/>
          
      
        <Route path="myproducts" element = {<MyProducts/>}/>
        
        <Route path="myaccount" element={<Profile/>}/>
      </Routes>
      </motion.div>
      </div>
    <Footer/>
    </div>
  );
};


    
