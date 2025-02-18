import axios from 'axios';
import toast from 'react-hot-toast';

const makeAuthenticatedRequest = async (url, method = 'GET', data = null) => {
  try {
    const response = await axios({
      url,                     // URL for the request
      method,                  // HTTP method (GET, POST, etc.)
      data,                    // Data to send (for POST, PUT, etc.)
      withCredentials: true,   // Include credentials (cookies) in the request
    });
    console.log(response);
    
    return response.data; // Return the response data
  } catch (err) {
    // Handle errors
    if (err.response) {
      // Server responded with a status other than 2xx
      const status = err.response.status;
      const message = err.response.data?.message || 'An error occurred';

      if (status === 300) {
        toast.error('Request failed: item already in cart');
      } else {
        toast.error(`Request failed: ${message}`);
      }
    } else if (err.request) {
      // Request was made but no response was received
      toast.error('Network error. Please try again later.');
    } else {
      // Something happened while setting up the request
      toast.error(`Error: ${err.message}`);
    }
  }
};

export default makeAuthenticatedRequest;
