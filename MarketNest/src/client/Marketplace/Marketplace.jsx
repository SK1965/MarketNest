import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from '../Error';
import Home from './pages/Home';
import MarketplaceLogin from './MarketPlaceLogin';
import { useEffect, useState } from 'react';
import LoginContext from './store/LoginContest';
import axios from 'axios';

export default function MarketPlace() {
  const [logindata, setLogindata] = useState(() => {
    const storedData = localStorage.getItem("logindata");
    return storedData ? JSON.parse(storedData) : { login: false, user: {} };
  });

  const onLogin = (user) => {
    const newLoginData = { login: true, user: user };
    setLogindata(newLoginData);
    localStorage.setItem("logindata", JSON.stringify(newLoginData));
  };

  const onLogout = () => {
    const newLoginData = { login: false, user: {} };
    setLogindata(newLoginData);
    localStorage.setItem("logindata", JSON.stringify(newLoginData));
  };

  const onUpdate = async (data) => {
    if (logindata.login) {
      const serversendingdata = {
        data: data,
        id: logindata.user._id
        
      };
      try {
        const response = await axios.post("/server/marketplace/updateuser", serversendingdata);
        console.log( response.data)
        const newLoginData = { login: true, user: response.data };
        setLogindata(newLoginData);
        localStorage.setItem("logindata", JSON.stringify(newLoginData));
      } catch (error) {
        console.error("Error updating creator:", error);
      }
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("logindata");
    if (storedData) {
      setLogindata(JSON.parse(storedData));
    }
  }, []);

  return (
    <LoginContext.Provider value={{ logindata, onLogin, onLogout, onUpdate }}>
      
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/login" element={<MarketplaceLogin />} />
          <Route path="/" element={<Error />} />
        </Routes>
    </LoginContext.Provider>
  );
}