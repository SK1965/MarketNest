import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProduct} from '../../ProductStore/ProductContext';
import { usecheckLogin } from '../store/CreatorContext';

const MyProduct = () => {
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logindata } = usecheckLogin();
  const { fetchProductbyId } = useProduct();
  const [user, setUser] = useState(logindata.user);

  useEffect(() => {
    if (!logindata.login) {
      navigate("../login");
    } else {
      const fetchProducts = async () => {
        if (user.products && user.products.length > 0) {
          try {
            const fetchedProducts = await fetchProductbyId(user.products);
            setUserProducts(fetchedProducts.filter(Boolean));
          } catch (error) {
            console.error("Error fetching products:", error);
          } finally {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [logindata.login, navigate, user.products, fetchProductbyId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mx-4 w-auto px-4 py-8 bg-white">
      {userProducts.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {userProducts.map((product, index) => (
            <Link
              to="../productpage"
              state={{ product: product }}
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img src={product.thumbnail} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                <div className="flex items-center space-x-4 font-semibold">
                  <span className="text-3xl font-bold text-indigo-600">₹{product.price}</span>
                  <span className="text-xl text-gray-500 line-through">₹{product.mrp}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">{product.discount}% Off</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProduct;
