import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProduct } from '../../ProductStore/ProductContext';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { product } = useProduct();

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      // Simulating API call delay
      setProducts(product.products || []);
      setLoading(false);
    };

    fetchSearchResults();
  }, [product.products]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mx-4 w-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold mb-10">Search Results for ""</h1>
      {products.length === 0 ? (
        <p className="text-gray-600">No products found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Link
            to="../productpage"
            state={{ product: product }}
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img src={product.thumbnail} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                <div className="flex items-center space-x-4 font-semibold">
                  <span className="text-3xl font-bold text-indigo-600">₹{product.price}</span>
                  <span className="text-xl text-gray-500 line-through">₹{product.mrp}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">{product.discount}% Off</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
