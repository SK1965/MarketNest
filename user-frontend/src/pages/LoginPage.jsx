import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/slices/authSlice'; // Your Redux actions
import toast from 'react-hot-toast';
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://marketnestuser.onrender.com/api/v1/user/login`,
        {
          email: formData.email,
          password: formData.password
        }
      );
      console.log(response);
      const user = response.data;
      dispatch(login(user));

      toast.success('Logged in successfully!');
      navigate('/'); // Navigate to the home page after login
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-md h-screen mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="input"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          
          <button type="submit" className="w-full btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/register')} // Navigate to Register page
            className="text-primary hover:underline"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;