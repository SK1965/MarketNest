import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCheckLogin } from '../store/LoginContest';
import { useProduct } from '../../ProductStore/ProductContext';

const CartPage = () => {
  const { logindata, onUpdate } = useCheckLogin();
  const { fetchProductbyId } = useProduct();
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (logindata.user && logindata.user.mycart) {
        try {
          const products = await fetchProductbyId(logindata.user.mycart);
          setCart(products);
        } catch (error) {
          console.error("Error fetching cart products:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchCartProducts();
  }, [logindata.user, fetchProductbyId]);

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = cart.filter(item => item._id !== productId);
      setCart(updatedCart);
      
      const updatedCartIds = updatedCart.map(item => item._id);
      await onUpdate({ mycart: updatedCartIds });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container min-h-screen mx-auto p-4">
      <h2 className="text-3xl font-bold mt-12 mb-6 text-center">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-xl text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          {cart.map(item => (
            <div key={item._id} className="flex items-center justify-between border-b py-4 bg-slate-200">
              <div className="flex items-center">
                <img src={item.thumbnail} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          <div className="flex relative mt-6 text-2xl font-bold">
            Total: ${totalPrice.toFixed(2)}
            <div className='absolute right-0 text-sm'>
              <button className="border border-slate-400 text-indigo-600 py-4 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition duration-300 w-48">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;