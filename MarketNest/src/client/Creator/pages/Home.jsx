import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import HomePage from "./HomePage";
import Dashboard from "./Dashboard";
import Footer from "../../Footer";
import MyProducts from "./MyProducts";
import AddProduct from "./AddProduct";
import Profile from "./Profile";
import ProductPage from "./ProductPage";

export default function Home(){
    
    return (
    <div className="">
       
     <div className=" pt-12">
      {/* Main Content */}
      <Routes>
        <Route path="home" element={<HomePage/>} />
        <Route path="dashboard" element ={<Dashboard/>}/>
        <Route path="myproducts" element = {<MyProducts/>}/>
        <Route path="addproduct" element = {<AddProduct/>}/>
        <Route path="myaccount" element={<Profile/>}/>
        <Route path="productpage" element = {<ProductPage/>}/>
      </Routes>
      </div>
    <Footer/>
    </div>
  );
};


    
