/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Categories(){
  let iml = "https://images.unsplash.com/photo-1522204538344-922f76ecc041?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  const [data , setData] = useState()
  useEffect(() => { 
    
    const fetchData = async () => {
      try {
        const response = await axios.get("/server/marketplace/trending");
        setData(response.data.result);
      } catch (error) {  
        console.error("Error fetching data:", error);
        setData([]);
      }
    };
   
    fetchData();
  }, []);

   
                    
   return <>
   <div className="w-full rounded-md shadow-md bg-transparent dark:text-gray-800">

     {/*Categories Header css defined in index.css*/}

   <div className="  font-bold flex justify-center items-center space-x-2 mt-10">
    <div className="letter text-6xl text-black">T</div>
    <div className="letter text-6xl text-black">R</div>
    <div className="letter text-6xl text-black">E</div>
    <div className="letter text-6xl text-black">N</div>
    <div className="letter text-6xl text-black">D</div>
    <div className="letter text-6xl text-black">I</div>
    <div className="letter text-6xl text-black">N</div>
    <div className="letter text-6xl text-black">G</div>
   </div>

   

{/* Categories */}
<div className="container mx-auto px-4 py-16 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {data && data.map((c, index) => (
          <motion.div
            key={index}
            className="relative bg-white rounded-xl shadow-lg overflow-hidden group"
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div
              className="relative h-96 w"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={c.thumbnail}
                alt={c.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </motion.div>
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-slate-200 bg-opacity-90 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
             <h2 className="text-xl font-semibold text-gray-800 mb-2">{c.name}</h2>
                <div className="flex items-center space-x-4 font-semibold">
    <span className="text-3xl font-bold text-indigo-600">₹{c.price}</span>
    <span className="text-xl text-gray-500 line-through">₹{c.mrp}</span>
    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">{c.discount}% Off</span>
    </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
    </div>
   </>
}