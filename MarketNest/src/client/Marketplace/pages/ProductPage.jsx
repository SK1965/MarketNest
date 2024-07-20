import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useCheckLogin } from '../store/LoginContest';
import axios from 'axios';

const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(location.state ? location.state.product : {});
  const { logindata, onUpdate } = useCheckLogin();
  const [mainImage, setMainImage] = useState(product.images ? product.images[0] : '');
  const [carttext, setcarttext] = useState("Add to cart");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (product.images) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  const onaddTocart = async () => {
    setIsLoading(true);
                                             
    if (!logindata.login) {
      navigate("../../login");
      return;
    }

    try {
      const newCartText = carttext === "Add to cart" ? "Remove from cart" : "Add to cart";
      setcarttext(newCartText);

      const updatedCart = newCartText === "Remove from cart" 
        ? [...(logindata.user.mycart || []), product._id]
        : (logindata.user.mycart || []).filter(id => id !== product._id);

      const serversendingdata = {
        data: {mycart: updatedCart }
      };
      const response = await axios.post("/server/updatecreator", serversendingdata);
      const newLoginData = { login: true, user: response.data };
      
      onUpdate(newLoginData);
      localStorage.setItem("logindata", JSON.stringify(newLoginData));

      alert(newCartText === "Remove from cart" ? "Product added to cart" : "Product removed from cart");
    } catch (error) {
      console.error("Error updating cart:", error);
      alert("An error occurred while updating your cart");
    } finally {
      setIsLoading(false);
    }
  };

  if (!product || !product.images) {
    return <div className='min-h-screen'>No product data available</div>;
  }

  return (
    <div className="relative max-w-screen mx-auto flex justify-center align-middle p-4 bg-slate-900">
      <div className="flex justify-center space-x-8">
        {/* Image Gallery */}
        <div className="flex flex-col pt-16 space-y-4">
          {product.images.map((image, index) => (
            <div
              key={index}
              className="h-max w-max p-3 rounded-xl hover:bg-slate-900 hover:opacity-80 hover:duration-300 target:bg-gray-50"
              onMouseEnter={() => {
                setMainImage((prevImage) => {
                  if (prevImage !== image) {
                    return image;
                  }
                  return prevImage;
                });
              }}
            >
              <img src={image} alt="Thumbnail" className="w-28 h-28" />
            </div>
          ))}
        </div>

        {/* Main Product Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mainImage}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-auto py-10">
              <img src={mainImage} alt="Main Product" className="w-[720px] h-[800px]" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Product Details */}
        <div className="pl-10 w-2/5 space-y-8 rounded-lg shadow-xl p-8">
          <div className="space-y-4">
            <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">Digital Template</span>
            <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-indigo-600">₹{product.price}</span>
            <span className="text-xl text-gray-500 line-through">₹{product.mrp}</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">{product.discount}% Off</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 font-semibold">Format:</span>
              <span className="text-gray-600">{product.format}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 font-semibold">Responsive:</span>
              <span className="text-gray-600">{product.responsive}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 font-semibold">Customization:</span>
              <span className="text-gray-600">Easy to customize with clear documentation</span>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Template Variations</h2>
            <p className="text-gray-600"></p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            <button 
              className={`bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-slate-200 transition duration-300 w-48 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={onaddTocart}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : carttext}
            </button>
            <button className="border border-slate-400 text-indigo-600 py-4 rounded-lg font-semibold hover:bg-indigo-500 hover:text-white transition duration-300 w-48">Buy Now</button>
          </div>
          <div className="p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Features</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Modern and clean design</li>
              <li>Fully responsive layout</li>
              <li>Easy customization options</li>
              <li>Cross-browser compatibility</li>
              <li>SEO optimized structure</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;