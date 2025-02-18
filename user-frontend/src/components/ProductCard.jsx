import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cart } from '../store/slices/cartSlice';
import toast from 'react-hot-toast';
import makeAuthenticatedRequest from '../services/AuthenticatedRequest';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const handleAddToCart = async(id) => {
    
    const response =await makeAuthenticatedRequest(`${import.meta.env.VITE_USER_URL}/addtocart/${product._id}`)
    const mycart = response.data
    dispatch(cart(mycart));
    toast.success('Added to cart!');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Link to={`/products/${product._id}`}>
        <motion.img 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          src={product.thumbnail} 
          alt={product.name}
          className="w-full h-72 object-cover p-4"
        />
      </Link>
      <div className="p-4">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold hover:text-primary">{product.name}</h3>
        </Link>
        <p className="text-gray-600 mt-2">{product.headline || "this is product is a digital product.and it is reusable"}</p> 
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">₹{product.price}</span>
          <div className="space-x-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="btn btn-secondary"
            >
              Add to Cart
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link 
                to={`/products/${product._id}`}
                className="btn btn-primary"
              >
                View Details
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard