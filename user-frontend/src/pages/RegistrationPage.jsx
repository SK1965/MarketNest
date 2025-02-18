import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import makeAuthenticatedRequest from '../services/AuthenticatedRequest';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    profileImage: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Create a new FormData object
    const formDataToSend = new FormData();
    formDataToSend.append('fullname', formData.fullname);
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);

    // Append the profile image if it's selected
    if (formData.profileImage) {
      formDataToSend.append('profileImage', formData.profileImage);
    }

    try {
      // Send the registration request using the FormData object
      const response = await makeAuthenticatedRequest(
        `${import.meta.env.VITE_USER_URL}/create-user`,
        'POST',
        formDataToSend
      );

      if (response.data) {
        toast.success('Registration successful! Please log in.');
        navigate('/login'); // Redirect to the login page after successful registration
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form data input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
        setFormData({
          ...formData,
          profileImage: file,
        });
      } else {
        toast.error('Only JPG, JPEG, and PNG files are allowed.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullname"
              required
              className="input"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              required
              className="input"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
            <input
              type="file"
              name="profileImage"
              accept=".jpg, .jpeg, .png"
              className="input"
              onChange={handleImageChange}
            />
          </div>

          <button type="submit" className="w-full btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/login')} // Navigate to the Login page
            className="text-primary hover:underline"
          >
            Already have an account? Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
