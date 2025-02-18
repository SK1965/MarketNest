import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';
import makeAuthenticatedRequest from '../services/AuthenticatedRequest';
import { cart, removeItem } from '../store/slices/cartSlice';
import { useEffect, useState } from 'react';

function Cart() {
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null); // Track error state
  const { items, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch cart data
  const getcart = async () => {
    try {
      setLoading(true);  // Set loading to true before making the API call
      const response = await makeAuthenticatedRequest(`${import.meta.env.VITE_USER_URL}/cart`);
      dispatch(cart(response.data)); // Dispatch data to Redux
    } catch (error) {
      setError('Failed to load cart data.'); // Set error message if API call fails
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false when the request is finished
    }
  };

  useEffect(() => {
    getcart();  // Fetch cart data when the component mounts
  }, []);

  // Handle removing an item from the cart
  const handleRemove = async (id) => {
    try {
      console.log(`${import.meta.env.VITE_USER_URL}/removefromcart/${id}`);
      
      await makeAuthenticatedRequest(`${import.meta.env.VITE_USER_URL}/removefromcart/${id}`, 'DELETE');
      dispatch(removeItem(id));  // Update the Redux store after successful removal
    } catch (error) {
      setError('Failed to remove item from cart.');
      console.error(error);
    }
  };

  // Loading or error state rendering
  if (loading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Loading Cart...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">{error}</h2>
        <button 
          onClick={() => navigate('/products')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Browse Products
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <button 
          onClick={() => navigate('/products')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 space-y-4">
          {items.map((item, indx) => (
            <div key={indx} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-4">
                <img 
                  src={item.thumbnail} 
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleRemove(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-50 p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold">₹{total.toFixed(2)}</span>
          </div>
          
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
