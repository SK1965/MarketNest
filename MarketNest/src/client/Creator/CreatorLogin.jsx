import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usecheckLogin } from './store/CreatorContext';

const CreatorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [text, setText] = useState('');
  const [imglink, setimglink] = useState('');
  const [bgcolor, setbgcolor] = useState('');
  const [serverdata, setserverdata] = useState({ message: '', data: '' });
  const {onLogin} = usecheckLogin();
  const navigate = useNavigate();

  useEffect(() => {
    setimglink("https://images.unsplash.com/photo-1522204538344-922f76ecc041?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    setbgcolor("bg-gradient-to-br from-pink-100 via-violet-0 to-pink-100");
    setText("Welcome, creative minds! Let's unlock your canvas and bring your vision to life.");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await axios.post("/server/creators/login", data);
      setserverdata(response.data);
      if(response.data.message === "Login Sucessfull"){
        navigate("../myaccount");
        onLogin(response.data.user);
      }
    } catch (error) {
      console.error('There was an error!', error);
      setserverdata({ message: "Server error", data: "" });
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgcolor} p-4`}>
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Login Form */}
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
        {/* Right Side - Image and Branding */}
        <div className="md:w-1/2 bg-gradient-to-tl from-green-600 to-purple-300 p-12 text-white flex flex-col justify-between">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-white text-lg">{text}</p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-30 rounded-2xl"></div>
            <img src={imglink} alt="Abstract" className="rounded-2xl object-cover w-full h-64 brightness-90" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorLogin;