import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import makeAuthenticatedRequest from '../services/AuthenticatedRequest';

function Profile() {
  const { user } = useSelector(state => state.auth); // Assuming `user` is part of the Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullname: user?.fullname || '',
    username: user?.username || '',
    email: user?.email || '',
    aboutMe: user?.aboutMe || 'A passionate developer.',
    profileImage: user?.profileImage || ''
  });

  // Handle logout
  const handleLogout = async () => {
    const response = await makeAuthenticatedRequest(`${import.meta.env.VITE_USER_URL}/logout`);
    if (response.status === 200) {
      dispatch(logout());
      toast.success('Successfully logged out');
      navigate('/'); // Redirect to home or login page
    } else {
      toast.error('Logout failed');
    }
  };

  // Handle redirection if no user is logged in
  
  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle profile image change
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profileImage', file);

      try {
        const response = await makeAuthenticatedRequest(
          `${import.meta.env.VITE_USER_URL}/update-profile`,
          'PUT',
          formData // Set to true for multipart/form-data requests
        );
        if (response.data) {
          setFormData((prevData) => ({
            ...prevData,
            profileImage: response.data.profileImage // Assuming the response contains the new image URL
          }));
          toast.success('Profile image updated successfully');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to update profile image');
      }
    }
  };

  // Handle profile update (onSubmit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the updated data to the server
      const response = await makeAuthenticatedRequest(
        `${import.meta.env.VITE_USER_URL}/update-user`,
        'PUT',
        formData
      );

      if (response.data) {
        toast.success('Profile updated successfully');
        setIsEditing(false); // Exit the edit mode after successful update
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Profile update failed');
    }
  };

  // If user is not logged in, show nothing or a loading indicator
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-xl p-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Profile</h1>

      {/* Profile Image with Edit Button */}
      <div className="relative flex justify-center mb-8">
        <img
          src={formData.profileImage || user.profileImage}
          alt="Profile"
          className="w-40 h-40 object-cover rounded-full border-4 border-primary"
        />
        {/* Edit Button */}
        <button
          onClick={() => document.getElementById('profileImageInput').click()}
          className="absolute top-1/3 bg-gray-800 opacity-80 text-white rounded-full p-4 hover:bg-primary-dark transition duration-300"
          title="Edit Profile Image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
        {/* Hidden File Input */}
        <input
          type="file"
          id="profileImageInput"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Edit Button for Profile Details */}
      {!isEditing && (
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary text-white py-2 px-4 rounded-md"
          >
            Edit Profile
          </button>
        </div>
      )}

      {/* Form for Editing Profile */}
      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Username */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* About Me */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-600">About Me</label>
            <textarea
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="4"
            />
          </div>

          <div className="pt-6 flex justify-center">
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* User Information Display (View Mode) */}
      {!isEditing && (
        <div className="space-y-6">
          {/* Full Name */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-600">Full Name</label>
            <p className="text-lg font-semibold text-gray-800">{formData.fullname}</p>
          </div>

          {/* Username */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-600">Username</label>
            <p className="text-lg font-semibold text-gray-800">{formData.username}</p>
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-600">Email</label>
            <p className="text-lg font-semibold text-gray-800">{formData.email}</p>
          </div>

          {/* About Me */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-600">About Me</label>
            <p className="text-lg text-gray-700">{formData.aboutMe}</p>
          </div>

          {/* Logout Button */}
          <div className="pt-6 flex justify-center">
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
