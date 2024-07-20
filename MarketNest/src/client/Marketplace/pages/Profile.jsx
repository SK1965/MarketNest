import React, { useState ,useEffect } from 'react';
import { useCheckLogin } from '../store/LoginContest';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false);
  const {logindata} = useCheckLogin() 
  const {onLogout} = useCheckLogin()
  const [userdata ,setdata] = useState(logindata)
  const [user, setUser] = useState({
    name: (userdata.user.firstname+" "+userdata.user.lastname)||'John Doe',
    email: userdata.user.email,
    phone: userdata.user.phone,
    address: userdata.user.address,
    avatar: 'https://example.com/avatar.jpg',
    memberSince:'January 2020',
    recentOrders:userdata.user.recentOrders|| [
      { id: '1234', date: '2023-07-01', total: 129.99, status: 'Delivered' },
      { id: '1235', date: '2023-06-15', total: 79.50, status: 'Shipped' },
      { id: '1236', date: '2023-05-30', total: 199.99, status: 'Delivered' },
    ],
    
    paymentMethods: [
      { id: 1, type: 'Credit Card', last4: '1234', expiry: '12/24' },
      { id: 2, type: 'PayPal', email: 'johndoe@email.com' },
    ],
  });

  const [editedUser, setEditedUser] = useState({ ...user });

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };
  const handleLogout = ()=>{
    onLogout()
    navigate("../../../home")
    
  }
  
  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">My Account</h1>
       <div> {!isEditing && (
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Edit Profile
          </button>
        )}
         <button
            onClick={handleLogout}
            className="bg-red-500 ml-2 text-white px-6 py-3 rounded-lg hover:bg-slate-600 transition duration-300"
          >
            Logout
          </button>
          </div>
      </div>

      <div className="flex items-center mb-8">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full mr-8 border-2 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">Member since {user.memberSince}</p>
        </div>
      </div>

      {isEditing ? (
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
              <input
                type="text" id="name" name="name" value={editedUser.name} onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input
                type="email" id="email" name="email" value={editedUser.email} onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
              <input
                type="tel" id="phone" name="phone" value={editedUser.phone} onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
              <input
                type="text" id="address" name="address" value={editedUser.address} onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button" onClick={handleCancel}
              className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg mr-4 hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="button" onClick={handleSave}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address}</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-left">Order ID</th>
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Total</th>
                    <th className="py-2 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {user.recentOrders.map(order => (
                    <tr key={order.id} className="border-b">
                      <td className="py-2 px-4">{order.id}</td>
                      <td className="py-2 px-4">{order.date}</td>
                      <td className="py-2 px-4">${order.total.toFixed(2)}</td>
                      <td className="py-2 px-4">{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-4">Payment Methods</h3>
            {user.paymentMethods.map(method => (
              <div key={method.id} className="mb-2">
                <p><strong>{method.type}:</strong> {method.type === 'Credit Card' ? `**** **** **** ${method.last4}` : method.email}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;