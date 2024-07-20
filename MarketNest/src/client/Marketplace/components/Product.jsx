export default function Product(){
    let iml = "https://images.unsplash.com/photo-1522204538344-922f76ecc041?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  
    return(
        <div className="w-1/5 h-1/3 border flex-none border-gray-200 rounded-lg p-4 m-2 text-center bg-white shadow-md">
           <img src={iml} alt="Product Name" className="w-full h-auto mb-4 rounded-md"/>
           <h3 className="text-lg font-semibold mb-2">Product Name</h3>
           <p className="text-sm text-gray-600 mb-3">Short product description goes here.</p>
           <div className="text-xl font-bold text-red-600 mb-4">$99.99</div>
           <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300">
           Remove Product
           </button>
       </div>
    )
}