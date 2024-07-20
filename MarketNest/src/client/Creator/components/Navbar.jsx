import { Link } from "react-router-dom";

export default function Navbar({ isMenuOpen, setIsMenuOpen }) {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-full">
        <div className="flex justify-between items-center h-20 px-4 md:px-24">
          <Link to="/creators" className="flex-shrink-0">
            <span className="font-semibold text-gray-500 text-3xl">CreatorHub</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4 text-lg">
            <Link
              to="/creators/home"
              className="py-4 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
            >
              home
            </Link>
            <Link
              to="/creators/myproducts"
              className="py-4 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
            >
              My Products
            </Link>
            <Link
              to="/creators/addproduct"
              className="py-4 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
            >
              Add Product
            </Link>
            <Link
              to="/creators/myaccount"
              className="py-4 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
            >
              Profile
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6 text-gray-500 hover:text-green-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-lg`}>
        <ul className="px-4 pt-4 pb-2 space-y-1 text-sm">
          <li>
            <Link
              to="/creators/dashboard"
              className="block px-2 py-4 text-gray-500 font-semibold hover:bg-green-500 hover:text-white transition duration-300"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/creators/myproducts"
              className="block px-2 py-4 text-gray-500 font-semibold hover:bg-green-500 hover:text-white transition duration-300"
            >
              My Products
            </Link>
          </li>
          <li>
            <Link
              to="/creators/addproduct"
              className="block px-2 py-4 text-gray-500 font-semibold hover:bg-green-500 hover:text-white transition duration-300"
            >
              Add Product
            </Link>
          </li>
          <li>
            <Link
              to="/creators/myaccount"
              className="block px-2 py-4 text-gray-500 font-semibold hover:bg-green-500 hover:text-white transition duration-300"
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
