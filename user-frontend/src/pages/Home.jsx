import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { setProducts, setLoading, setError } from '../store/slices/productsSlice'; // Import the actions
import makeAuthenticatedRequest from '../services/AuthenticatedRequest';

function Home() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);

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
  }, [dispatch, products.length]);

  const featuredProducts = products.slice(0, 8);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <motion.section 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-[500px] mb-2 bg-cover bg-center bg-image mx-2"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to MarketNest</h1>
            <p className="text-xl">Discover premium digital products for your business</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 btn btn-primary text-lg"
              onClick={() => window.location.href = '/products'}
            >
              Explore Products
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* New Image Section Below */}
      <motion.section
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-10"
      >
        <img
          src="https://images.unsplash.com/photo-1538170819641-15b741105cb3?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  // Replace with your actual image URL
          alt="Admin Section"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center">
          <div className="text-white">
            <h2 className="text-3xl font-semibold mb-4">Creators</h2>
            <p className="text-xl mb-6">Access your Creators panel to manage the platform.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary text-lg"
              onClick={() => window.location.href = 'http://localhost:5174/'}
            >
              Go to Admin
            </motion.button>
          </div>
        </div>
      </motion.section>

      <div className="px-4">
        <section className="mb-12">
          <motion.h2 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white"
          >
            Featured Products
          </motion.h2>
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {featuredProducts.length === 0 && !loading && !error && (
              <p>No featured products available at the moment.</p>
            )}
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
}

export default Home;
