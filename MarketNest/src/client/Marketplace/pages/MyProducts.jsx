import Product from "../components/Product"

export default function MyProducts(){
    return (
      
        <div className="w-full h-full bg-gray-500 border border-black my-4 rounded-md s">
        <div className="py-1 ">
            <h1 className="text-2xl py-1 px-4  relative">My Products...</h1>
       </div >
       <div>
        <div className="py-1 mx-4 rounded-t-md">
            <h1 className="text-xl py-2 px-4 bg-gray-50">./myaccount/products/templates</h1>
       </div >
       <div className=" mx-4 p-4 flex  overflow-y-hidden scrollbar-none bg-slate-100">
          <Product/>
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
</div>
</div>
  
<div>
        <div className="py-1  ">
            <h1 className=" mx-4 text-xl py-2 px-4 bg-gray-50">./myaccount/products/templates</h1>
       </div >
       <div className="mx-4 p-4 flex  overflow-y-hidden scrollbar-none bg-slate-100">
          <Product/>
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
</div>
</div>

<div>
        <div className="py-1  ">
            <h1 className=" mx-4 text-xl py-2 px-4 bg-gray-50">./myaccount/products/templates</h1>
       </div >
       <div className="mx-4 p-4 flex  overflow-y-hidden scrollbar-none bg-slate-100">
          <Product/>
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
</div>
</div>

<div>
        <div className="py-1  ">
            <h1 className="mx-4 text-xl py-2 px-4 bg-gray-50">./myaccount/products/templates</h1>
       </div >
       <div className="mx-4 p-4 flex  overflow-y-hidden scrollbar-none bg-slate-100">
          <Product/>
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
          <Product />   
</div>
</div>
        </div>
       
    )
}