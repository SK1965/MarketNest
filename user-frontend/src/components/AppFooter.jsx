import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const AppFooter = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container  ">
        <div className=" w-screen px-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 ">About Us</h3>
            <p className="text-sm">
              We are a leading e-commerce platform <br /> offering the best products at competitive <br /> 
              prices. Our mission is to provide a  <br /> seamless shopping experience for  <br />our customers.
            </p>
          </div>

          {/* Quick Links Section */}
          <div >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm">
              <li className="mb-2"><a href="/" className="hover:text-gray-400">Home</a></li>
              <li className="mb-2"><a href="/shop" className="hover:text-gray-400">Shop</a></li>
              <li className="mb-2"><a href="/about" className="hover:text-gray-400">About Us</a></li>
              <li className="mb-2"><a href="/contact" className="hover:text-gray-400">Contact Us</a></li>
              <li className="mb-2"><a href="/privacy-policy" className="hover:text-gray-400">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Customer Service Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="text-sm">
              <li className="mb-2"><a href="/faq" className="hover:text-gray-400">FAQ</a></li>
              <li className="mb-2"><a href="/shipping" className="hover:text-gray-400">Shipping Information</a></li>
              <li className="mb-2"><a href="/returns" className="hover:text-gray-400">Returns & Exchanges</a></li>
              <li className="mb-2"><a href="/terms" className="hover:text-gray-400">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-gray-400">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="hover:text-gray-400">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="hover:text-gray-400">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" className="hover:text-gray-400">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t w-screen border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your E-Commerce Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;