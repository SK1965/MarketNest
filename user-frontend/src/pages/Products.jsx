import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { setProducts, setLoading, setError } from '../store/slices/productsSlice'; // Import the actions
import makeAuthenticatedRequest from '../services/AuthenticatedRequest';

function Products() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchProducts = async () => {
    dispatch(setLoading(true)); // Set loading to true when fetching
    try {
      const response = await makeAuthenticatedRequest(`${import.meta.env.VITE_PRODUCTS_URL}/getproduct`);
      dispatch(setProducts(response.data)); // Dispatch products to the Redux store
    } catch (err) {
      dispatch(setError('Failed to load products')); // Handle any error during fetch
    } finally {
      dispatch(setLoading(false)); // Set loading to false once fetch is complete
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts(); // Fetch products if they're not already loaded
    }
  }, [products]);

  const categories = [...new Set(products.map(product => product.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-8"
    >
      <div className="mb-8">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold mb-6"
        >
          Our Products
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          <input
            type="text"
            placeholder="Search products..."
            className="input md:w-96"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="input md:w-48"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </motion.div>
      </div>

      {loading && <p>Loading...</p>} {/* Show loading state */}
      {error && <p className="text-red-500">{error}</p>} {/* Show error message */}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </motion.div>

      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-xl text-gray-600">No products found matching your criteria.</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Products;
