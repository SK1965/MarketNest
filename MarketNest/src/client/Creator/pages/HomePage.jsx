import { useNavigate } from "react-router-dom"
import { usecheckLogin } from "../store/CreatorContext"
import { useState, useEffect } from 'react'
import { useProduct } from "../../ProductStore/ProductContext"

export default function HomePage() {
    const navigate = useNavigate()
    const { logindata } = usecheckLogin()
    const { fetchProductbyId, product } = useProduct()
    const [user, setUser] = useState(logindata.user)
    const [userProducts, setUserProducts] = useState([])
    
    useEffect(() => {
        if (!logindata.login) {
            navigate("../login")
        } else {
            const fetchProducts = async () => {
                if (user.products && user.products.length > 0) {
                    try {
                        const fetchedProducts = await fetchProductbyId(user.products.slice(0,5))
                        setUserProducts(fetchedProducts.filter(Boolean))
                    } catch (error) {
                        console.error("Error fetching products:", error)
                    }
                }
            }
            fetchProducts()
        }
    }, [logindata.login, navigate, user.products, fetchProductbyId])

    const handleProductClick = (product) => {
        navigate("../productpage", { state: { product } })
    }
 
    return (
        <div className="container min-h-screen mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {user.username}!</h1>
            <p className="text-gray-600 mb-6">Here's an overview of your account and activity.</p>
            
            {/* Dashboard Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Total Sales</h2>
                    <p className="text-3xl font-bold text-green-600">₹ {user.totalSales || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Products</h2>
                    <p className="text-3xl font-bold text-blue-600">{userProducts.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Wallet Balance</h2>
                    <p className="text-3xl font-bold text-purple-600">₹ {user.wallletbalance || 0}</p>
                </div>
            </div>

            {/* Recent Products */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">Your Products</h2>
                {userProducts.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {userProducts.map((product, index) => (
                            <li 
                                key={index} 
                                className="py-4 flex items-center cursor-pointer hover:bg-gray-50 transition duration-150 ease-in-out"
                                onClick={() => handleProductClick(product)}
                            >
                                <img src={product.thumbnail} alt={product.name} className="w-20 h-20 object-cover mr-4" />
                                <div>
                                    <p className="text-lg font-medium">{product.name}</p>
                                    <p className="text-sm text-gray-600">{product.description.substring(0, 100)}...</p>
                                    <p className="text-sm font-semibold">Price: ₹{product.price}</p>
                                    <p className="text-sm">Sold: {product.sold}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">You haven't added any products yet.</p>
                )}
            </div>
        </div>
    )
}