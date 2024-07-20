import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductPage = () => {
  const location = useLocation();
  const { product } = location.state;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex justify-center items-center py-12 px-4">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="md:flex">
          <motion.div
            className="md:flex-shrink-0"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={product.thumbnail}
              alt={product.name}
              className="h-96 w-full object-cover md:w-96"
            />
          </motion.div>
          <div className="p-8">
            <motion.div
              className="uppercase tracking-wide text-sm text-indigo-500 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {product.category}
            </motion.div>
            <motion.h1
              className="mt-2 text-4xl leading-tight font-bold text-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {product.name}
            </motion.h1>
            <motion.p
              className="mt-4 text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {product.description}
            </motion.p>
            <motion.div
              className="mt-8 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <span className="text-4xl font-bold text-indigo-600">₹{product.price}</span>
              <span className="ml-4 text-xl text-gray-500 line-through">₹{product.mrp}</span>
              <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                {product.discount}% Off
              </span>
            </motion.div>
            <motion.button
              className="mt-8 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-500 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              delete item (soon..)
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductPage;