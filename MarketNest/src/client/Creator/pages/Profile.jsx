import { useState, useEffect } from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { usecheckLogin } from "../store/CreatorContext";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const { logindata, onLogout } = usecheckLogin();
  const navigate = useNavigate();

  const [editedSeller, setEditedSeller] = useState({
    username: logindata.user.username || "",
    description: logindata.user.description || "",
    location: logindata.user.location || "",
  });

  useEffect(() => {
    if (!logindata.login) {
      navigate("../login");
    }
  }, [logindata.login, navigate]);

  const seller = {
    name: logindata.user.username || "Jenny",
    joinDate: logindata.user.joinDate || "January 2022",
    walletbal: logindata.user.wallletbalance,
    totalSales: logindata.user.totalSales,
    description: logindata.user.description || "Passionate about creating handmade crafts and delivering quality products to my customers. With over 5 years of experience in the handmade industry, I specialize in unique jewelry pieces and home decor items that bring a personal touch to any space.",
    categories: ["templates", "Photos", "Designs", "GiftsCards", "etc"],
    profileImage: logindata.user.imglink || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: logindata.user.location || "Bangalore, India",
    responseTime: "No delay",
    shippingTime: "No delay",
    returnsPolicy: "No returns accepted",
  };

  const handleLogout = () => {
    onLogout();
    navigate("../../../../home");
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedSeller(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // Here you would typically update the profile information in your backend
    console.log("Saving profile:", editedSeller);
    setIsEditing(false);
    // Update logindata or refetch user data here
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <img className="h-24 w-24 rounded-full object-cover" src={seller.profileImage} alt={seller.name} />
              <div className="ml-6">
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={editedSeller.username}
                    onChange={handleEditChange}
                    className="text-2xl font-bold text-gray-900 border-b-2 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900">{seller.name}</h1>
                )}
                <p className="text-sm text-gray-600">Joined {seller.joinDate}</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={editedSeller.location}
                    onChange={handleEditChange}
                    className="text-sm text-gray-600 mt-1 border-b focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <p className="text-sm text-gray-600 mt-1">{seller.location}</p>
                )}
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button 
                onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)} 
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                {isEditing ? 'Save Profile' : 'Edit Profile'}
              </button>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 transition duration-300">
                Logout
              </button>
            </div>
          </div>

          {/* Rest of the component remains the same */}

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">About the Seller</h2>
            {isEditing ? (
              <textarea
                name="description"
                value={editedSeller.description}
                onChange={handleEditChange}
                className="mt-2 w-full text-gray-600 leading-relaxed border rounded p-2 focus:outline-none focus:border-blue-500"
                rows="4"
              />
            ) : (
              <p className="mt-2 text-gray-600 leading-relaxed">{seller.description}</p>
            )}
          </div>

          {/* Rest of the component remains the same */}

        </div>
      </div>
    </div>
  );
};

export default Profile;