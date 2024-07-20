import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MyProducts from './pages/MyProducts';
import Navbar from './components/Navbar';
import LoginCheckcontext from './store/CreatorContext';
import { useEffect, useState } from 'react';
import CreatorLogin from './CreatorLogin';
import axios from 'axios';

export default function Creator() {
  const [logindata, setLogindata] = useState(() => {
    // Initialize state from localStorage
    const storedLoginData = JSON.parse(localStorage.getItem("clogindata"));
    return storedLoginData || { login: false, user: {} };
  });

  const onLogin = (user) => {
    const newLoginData = {
      login: true,
      user: user
    };
    setLogindata(newLoginData);
    localStorage.setItem("clogindata", JSON.stringify(newLoginData));
  };

  const onLogout = () => {
    const newLoginData = {
      login: false,
      user: {}
    };
    setLogindata(newLoginData);
    localStorage.removeItem("clogindata");
  };

  const onUpdate = async (data) => {
    if (logindata.login) {
      const serversendingdata = {
        id: logindata.user._id,
        data: data
      };
      try {
        const response = await axios.post("/server/updatecreator", serversendingdata);
        const newLoginData = { login: true, user: response.data };
        setLogindata(newLoginData);
        localStorage.setItem("clogindata", JSON.stringify(newLoginData));
      } catch (error) {
        console.error("Error updating creator:", error);
      }
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <LoginCheckcontext.Provider value={{ logindata, onLogin, onLogout, onUpdate }}>
       <div className="fixed w-screen px-1">
     <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
     </div>
      <Routes>
        <Route path="login" element={<CreatorLogin />} />
        <Route path="*" element={<Home />} />
        {logindata.login && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/myproducts" element={<MyProducts />} />
          </>
        )}
      </Routes>
    </LoginCheckcontext.Provider>
  );
}