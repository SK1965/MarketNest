import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCartIcon, UserIcon, Bars3Icon } from '@heroicons/react/24/outline';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';

function Navbar() {
  const { items } = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.auth);
  
  // State to control the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
      <div className="container px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-primary dark:text-white">
          <span className="font-bold text-primary-600 dark:text-primary-400">
                MarketNest
             </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:absolute lg:right-16 lg:flex items-center space-x-8 text-xl">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary">Home</Link>
            <Link to="/products" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary">Products</Link>
            
            <Link to="/cart" className="relative text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary">
              <ShoppingCartIcon className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            <ThemeToggle />
            
            {isAuthenticated ? (
              <Link to="/profile">
                <UserIcon className="h-6 w-6 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary" />
              </Link>
            ) : (
              <Link to="/auth" className="btn btn-primary">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMenu}>
              <Bars3Icon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden  z-10 absolute top-20 right-4 left-64 bg-white dark:bg-gray-800 text-center py-4 rounded-lg shadow-lg">
            <Link to="/" className="block text-gray-700 dark:text-gray-200 py-2 hover:text-primary dark:hover:text-primary">Home</Link>
            <Link to="/products" className="block text-gray-700 dark:text-gray-200 py-2 hover:text-primary dark:hover:text-primary">Products</Link>
            <Link to="/cart" className="block text-gray-700 dark:text-gray-200 py-2 hover:text-primary dark:hover:text-primary">
              <ShoppingCartIcon className="h-6 w-6 inline-block mr-2" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
            <ThemeToggle />
            {isAuthenticated ? (
              <Link to="/profile" className="block text-gray-700 dark:text-gray-200 py-2 hover:text-primary dark:hover:text-primary">
                <UserIcon className="h-6 w-6 inline-block mr-2" />
                Profile
              </Link>
            ) : (
              <Link to="/auth" className="block btn btn-primary py-2 text-center">
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
