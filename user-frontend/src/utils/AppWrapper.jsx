import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
import makeAuthenticatedRequest from '../services/AuthenticatedRequest';

const AppWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); 

  // Authentication initialization (refresh tokens)
  const globalInitialization = async () => {
    console.log('App loaded or page refreshed!');
    try {
      const response = await makeAuthenticatedRequest(
        `${import.meta.env.VITE_USER_URL}/refresh-tokens`
      );
      const user = response.data;
      console.log(response);
      if (user) {
        dispatch(login(user)); // Dispatch login action if user is authenticated
        toast.success('Welcome back!');
      }
    } catch (error) {
      console.error('Not authenticated');
    } finally {
      setIsLoadingAuth(false); // Set loading state for authentication to false once it's done
    }
  };

  useEffect(() => {
    globalInitialization(); // Fetch products and cart after authentication
  }, []); 

  if (isLoadingAuth) {
    return <div>Loading...</div>; // Optionally show a loading indicator or spinner
  }

  return <>{children}</>; 
};

export default AppWrapper;
