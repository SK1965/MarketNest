import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Typewriter from './TypeWriter';



const LandingPage = () => {
    const navigate = useNavigate();
    const HandleCreatorLogin=()=>{
        navigate("/creators/login")
    }
    const HandleMarketPlaceLogin=()=>{
        navigate("/marketplace/login")
    }

    return (
        <div className="bg-gray-50">
            <nav className="w-full py-3 bg-white shadow">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold">
                        <span className="text-green-600">Market</span>Nest
                    </div>
                    <div className="flex space-x-6">
                        <Link to={"/register"} className="bg-green-600 text-white px-4 py-2 rounded">Sign up</Link>
                    </div>
                </div>
            </nav>
            <div className="flex flex-col md:flex-row w-full justify-center mx-4 my-2 space-x-4">
                <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4 py-16 border-r bg-gradient-to-br from-green-100 via-green-50 to-white">
                <div className="text-green-600 text-4xl font-semibold mb-2 h-10"><Typewriter>{"Listings"}</Typewriter></div>
                    <div className='text-4xl font-bold'>
                    {"For Creators"}
                    </div>
                    <p className="text-gray-700 text-xl mb-6 font-serif max-w-md">
                        From Passion to Profit: Your Products, Our Platform
                    </p>
                    <button className="border bg-green-500 border-green-500 text-lg px-16 py-4 rounded-md mb-4 hover:bg-transparent hover:text-gray-900" onClick={HandleCreatorLogin}>Login</button>
                    <p className="text-gray-600">
                        Don't have an account?<Link to="/register" state={{ userType: "Creator" }} className="text-green-600">Sign up</Link>
                    </p>
                </div>
                <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4 py-16 h-screen border-r bg-gradient-to-br from-gray-100 via-pink-50 to-white">
                    <div className="text-green-600 text-4xl font-semibold mb-2 h-10"><Typewriter>{"MarketePlace"}</Typewriter></div>
                    <div className='text-4xl font-bold'>
                {"For Customers"} </div>  
                    <p className="text-gray-700 text-xl font-serif max-w-md">
                        Discover Treasures, Delivered to Your Door
                    </p>
                    <button className="text-lg border border-green-500 px-16 py-4 rounded-md mb-4 hover:bg-green-500 hover:text-gray-900" onClick={HandleMarketPlaceLogin}>Login</button>
                    <p className="text-gray-600">
                        Don't have an account?<Link to={"/register"} state={{ userType: "User" }} className="text-green-600">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;