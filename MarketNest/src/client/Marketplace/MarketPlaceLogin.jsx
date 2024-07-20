import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckLogin } from './store/LoginContest';

const MarketPlaceLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [text, setText] = useState('');
  const [imglink, setImglink] = useState('');
  const [bgcolor, setBgcolor] = useState('');
  const [serverdata, setServerdata] = useState({ message: '', data: '' });
  const navigate = useNavigate();
  const {onLogin} = useCheckLogin()

  useEffect(() => {
    setImglink("https://images.unsplash.com/photo-1627163439097-373d08b797d1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    setBgcolor("bg-gradient-to-br from-purple-200 via-violet-0 to-purple-200");
    setText("Hello, treasure hunter! Ready to discover unique finds? Let's get you started.");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("/server/marketplace/login", data);
      setServerdata(response.data.message);
      console.log(response.data)
      if (response.data.message === "Login Sucessfull") {
        onLogin(response.data.user)
         navigate("../home");
      }
    } catch (error) {
      console.error('There was an error!', error);
      setServerdata({ message: "Server error", data: "" });
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgcolor} p-4`}>
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Image and Branding */}
        <div className="md:w-1/2 bg-gradient-to-br from-violet-200 to-indigo-600 p-12 text-white flex flex-col justify-between">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-violet-200">{text}</p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-30 rounded-2xl"></div>
            <img src={imglink} alt="Abstract" className="rounded-2xl object-cover w-full h-64 brightness-90" />
          </div>
        </div>
        {/* Right Side - Login Form */}
        <div className="md:w-1/2 p-12 bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Login</h2>
          <h3 className='text-lg pb-6'>{serverdata.message}</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 border focus:border-purple-500 focus:bg-white focus:outline-none transition duration-300 ease-in-out"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 border focus:border-purple-500 focus:bg-white focus:outline-none transition duration-300 ease-in-out"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
              </div>
              <a href="#" className="text-sm text-purple-600 hover:underline">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
            >
              Sign In
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="text-purple-600 font-semibold hover:underline">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketPlaceLogin;
