import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AppFooter from './components/AppFooter';
import LoginPage from './pages/LoginPage';
import LoginWrapper from './utils/LoginWrapper';
import RegistrationPage from './pages/RegistrationPage';
function App() {
  return (
      <Router   future={{
    v7_startTransition: true,
  }}>
        <div className="min-h-screen  bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navbar />
          <main className="py-2">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={
                                          <LoginWrapper>
                                            <Cart />
                                          </LoginWrapper>
                                          } />
              <Route path="/checkout" element={ 
                                          <LoginWrapper>
                                            <Checkout />
                                          </LoginWrapper>
                                          } />
              <Route path="/profile" element={<Profile />} />
              <Route path="/auth" element={<LoginPage />} />
              <Route path="/register" element = {<RegistrationPage/>}></Route>
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Toaster 
            position="bottom-right"
            toastOptions={{
              className: 'dark:bg-gray-800 dark:text-white'
            }}
          />
          <AppFooter />
        </div>
      </Router>
  );
}

export default App;