import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { cart, onBuy } from '../store/slices/cartSlice';
import toast from 'react-hot-toast';
import { ChevronLeft, ChevronRight, Star, Truck, Shield, Clock, Package, Pause, Play } from 'lucide-react';
import makeAuthenticatedRequest from '../services/AuthenticatedRequest';
import axios from 'axios';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState('description');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [product, setProduct] = useState({
    images: [""],
    thumbnail: "",
  });
  const [loading, setLoading] = useState(true); // New loading state
  const [error, setError] = useState(null); // New error state
  const timerRef = useRef(null);
  const [trxid , settrxid] = useState(null);

  // Get product and transform single image to array if needed
  const getproduct = async () => {
    try {
      setLoading(true); // Set loading to true when the request starts
      const response = await makeAuthenticatedRequest(`${import.meta.env.VITE_PRODUCTS_URL}/getproduct/${id}`);
      setProduct(response.data);
    } catch (error) {
      setError('Product not found or there was an issue fetching the data.');
      console.error(error); // You can also log the error to a service like Sentry
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  useEffect(() => {
    getproduct();
  }, [id]);

  // Auto-slide functionality
  const nextImage = useCallback(() => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  }, [product?.images?.length]);

  const prevImage = useCallback(() => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  }, [product?.images?.length]);

  // Setup auto-slide interval
  useEffect(() => {
    if (isPlaying && !isHovered && product?.images?.length > 1) {
      timerRef.current = setInterval(nextImage, 3000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, isHovered, nextImage, product?.images?.length]);

  // Product not found handling
  if (loading) {
    return (
      <div className="text-center min-h-screen py-12">
        <h2 className="text-2xl font-bold mb-4">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center min-h-screen py-12">
        <h2 className="text-2xl font-bold mb-4">{error}</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/products')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Back to Products
        </motion.button>
      </div>
    );
  }

  const handleAddToCart = async (id) => {
    try {
      // Make sure the API endpoint is correct for adding to cart
      const response = await makeAuthenticatedRequest(`${import.meta.env.VITE_USER_URL}/addtocart/${id}`);
      console.log(response);
      toast.success("Added to cart!");
    } catch (error) {
      console.error(error);
      toast.error("There was an issue adding the product to the cart.");
    }
  };

  const handleBuyNow = async () => {
    try {
      // Create an order on the backend
      const { data } = await axios.post(`${import.meta.env.VITE_USER_URL}/payment`, {
        amount: product.price, // pass the price or total value
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_API_KEY, // Your Razorpay key ID
        amount: product.price * 100, // amount in smallest currency unit (paise)
        currency: "INR",
        order_id: data.orderId, // order ID generated from the backend
        handler: function (response) {
          console.log(response);
          settrxid(response.razorpay_payment_id);

          // Handle successful payment here (update the order, etc.)
          toast.success("Payment successful!");

          if (product.file) {
            const link = document.createElement('a');
            link.href = product.file; // Cloudinary image URL
  
            // Set the file name as the last part of the URL or customize it
            link.download = product.file; // This will automatically extract the file name from the URL
  
            // Programmatically click the link to start the download
            link.click();// Programmatically click the link to trigger download
          }
        
        },
        prefill: {
         
        },
        theme: {
          color: "#3498db",
        },
      };

      // Open the Razorpay checkout modal
      const razorpay = new window.Razorpay(options);
      razorpay.open();

      //const response = await makeAuthenticatedRequest(`${import.meta.env.VITE_USER_URL}/order`,'POST', {transaction_id: trxid, product_id: ProductDetails._id});
      
    } catch (error) {
      console.error(error);
      toast.error("There was an issue initiating the payment.");
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-6xl mx-auto px-4 py-8"
      >
        {/* Breadcrumb */}
        <div className="text-sm mb-6">
          <span className="text-gray-500">Home / Products / {product.category} / </span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Image Slider Section */}
            <div
              className="md:w-1/2 relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative h-96">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={product.images[currentImageIndex]}
                    alt={`${product.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-96 object-cover"
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Play/Pause Control */}
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="absolute bottom-4 right-4 bg-black/30 p-2 rounded-full text-white hover:bg-black/50"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    {/* Slide Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors `}

                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2 px-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setIsPlaying(false);
                      }}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index ? 'border-blue-500' : 'border-transparent'
                      }`}
                    >
                      <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information Section */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-8 md:w-1/2"
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  <div className="flex items-center">
                    {renderStars(4.5)}
                    <span className="ml-2 text-gray-600">(200 reviews)</span>
                  </div>
                </div>
                <p className="text-xl text-green-600 mb-4">₹{product.price}</p>

                {/* Product Description Tabs */}
                <div className="flex mb-4 space-x-4 text-gray-700">
                  <button
                    onClick={() => setSelectedTab('description')}
                    className={`${
                      selectedTab === 'description' ? 'font-semibold text-blue-600' : ''
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setSelectedTab('specifications')}
                    className={`${
                      selectedTab === 'specifications' ? 'font-semibold text-blue-600' : ''
                    }`}
                  >
                    Specifications
                  </button>
                </div>
                <div>
                  {selectedTab === 'description' && (
                    <div>
                      <p>{product.description}</p>
                    </div>
                  )}
                  {selectedTab === 'specifications' && (
                    <div>
                      <ul>
                        {product.specifications.map((spec, index) => (
                          <li key={index} className="flex justify-between">
                            <span>{spec.name}</span>
                            <span>{spec.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Add to Cart and Buy Now Buttons */}
                <div className="flex space-x-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(id)}
                    className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Add to Cart
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBuyNow}
                    className="w-full px-6 py-2 bg-yellow-600 text-white rounded-lg"
                  >
                    Buy Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProductDetails;
