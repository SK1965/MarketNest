import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useProduct } from "../../../ProductStore/ProductContext";

export default function Navbar({ isMenuOpen, setIsMenuOpen }) {
  const [text, setText] = useState("Videos");
  const [searchbox, setSearchbox] = useState("");
  const { fetchProducts } = useProduct();
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchbox !== '') {
      fetchProducts(searchbox);
      navigate("../../marketplace/products");
    }
  };

  const handleClick = async (text) => {
    fetchProducts(text);
    navigate("../../marketplace/products");
  };

  const template = "Templates"; // Define the category strings
  const design = "Designs";
  const cards = "Cards";

  return (
    <nav className="shadow-lg bg-gray-800 fixed w-full">
      <div className="max-w-[1920px] mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/marketplace" className="flex-shrink-0">
            <span className="font-semibold text-slate-50 text-3xl">CreatorHub</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8 text-xl">
            <Link to={"./Home"} className="text-slate-50 font-semibold hover:text-red-500 transition duration-300">Home</Link>
            <div className="text-slate-50 font-semibold hover:text-orange-500 transition duration-300" onClick={() => handleClick("template")}>Templates</div>
            <div className="text-slate-50 font-semibold hover:text-yellow-500 transition duration-300" onClick={() => handleClick("design")}>Designs</div>
            <div className="text-slate-50 font-semibold hover:text-green-500 transition duration-300" onClick={() => handleClick("cards")}>Cards</div>
            <div className="w-40 text-center ">
              <Link
                className="text-slate-50 font-semibold hover:text-purple-500 transition duration-2000"
                onMouseEnter={() => setText("Coming Soon")}
                onMouseLeave={() => setText("Videos")}
              >
                {text}
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                className="w-full h-10 pl-4 pr-10 rounded-xl border border-gray-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                type="text"
                placeholder="Search your products here"
                onChange={(e) => { setSearchbox(e.target.value) }}
                onKeyPress={(e) => { if (e.key === "Enter") { handleSearch() } }}
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" onClick={handleSearch} />
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8 text-lg">
            <Link to="/marketplace/myaccount" className="text-slate-50 font-semibold hover:text-green-500 transition duration-300">Profile</Link>
            <Link to="/marketplace/dashboard" className="text-slate-50 font-semibold hover:text-green-500 transition duration-300">My Items</Link>
            <Link to="/marketplace/cart" className="text-slate-50 font-semibold hover:text-green-500 transition duration-300">My Cart</Link>
          </div>

          <div className="lg:hidden">
            <button className="text-slate-50 hover:text-green-500 focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-800">
          <div className="px-4 py-3">
            <div className="relative">
              <input
                className="w-full h-10 pl-4 pr-10 rounded-full border border-gray-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                type="text"
                placeholder="Search your products here"
                onChange={(e) => setSearchbox(e.target.value)}
                onKeyPress={(e) => { if (e.key === "Enter") handleSearch() }}
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" onClick={handleSearch} />
            </div>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/marketplace/home" className="block px-3 py-2 text-base font-medium text-slate-50 hover:text-red-500">Home</Link>
            <div className="block px-3 py-2 text-base font-medium text-slate-50 hover:text-orange-500" onClick={() => handleClick(template)}>Templates</div>
            <div className="block px-3 py-2 text-base font-medium text-slate-50 hover:text-yellow-500" onClick={() => handleClick(design)}>Designs</div>
            <div className="block px-3 py-2 text-base font-medium text-slate-50 hover:text-green-500" onClick={() => handleClick(cards)}>Cards</div>
            <Link to="" className="block px-3 py-2 text-base font-medium text-slate-50 hover:text-purple-500">Videos(coming soon)</Link>
            <Link to="/marketplace/myaccount" className="block px-3 py-2 text-base font-medium text-slate-50 hover:text-green-500">Profile</Link>
            <Link to="/marketplace/dashboard" className="block px-3 py-2 text-base font-medium text-slate-50 hover:text-green-500">My Items</Link>
            <Link to="/marketplace/cart" className="block px-3 py-2 text-base font-medium text-slate-50 hover:text-green-500">My Cart</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
