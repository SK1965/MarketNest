import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const LoginWrapper = ({ children }) => {
  // Get the authentication state from Redux
  const { isAuthenticated } = useSelector((state) => state.auth);

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // If the user is authenticated, render the children components
  return <>{children}</>;
};

export default LoginWrapper;