import { useRef } from "react";

const ProductImages = ({setImages , images})=>{
    const iref = useRef(null)
    const handleImageUpload = (e) => {
        const files = e.target.files;
        
        setImages([...files,...images]);

      };
        
          const handleFileDelete = (index) => {
            const img = images.splice(index , 1)
            setImages([...images])
            if(iref.current.value.includes(img[index].name)){
                iref.current.value=''
            }
          };
        
          return (
            <div className=" flex flex-col mb-4 ">
              <label htmlFor="thumbnail" className="block mb-1">
                Product Images(minimum 3)
              </label>
              <div className="h-full flex flex-col items-center py-16 border border-gray-900  w-full px-6  text-lg rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-green-400 transition duration-150 ease-in-out">
          <div className=" w-64 border border-gray-600 p-2 flex  justify-center ">
            <input
              type="file"
              id="timages"
              ref={iref}
              onChange={handleImageUpload}
              className=""
              accept="image/*"
              multiple
              required
            />
          </div>
              {(images.length!==0) && (
                images.map((image , index)=>(
                <div key={index} className="mt-3 flex flex-col items-center">
                  <span className="text-md text-gray-700">{image.name}
                  <button
                    type="button"
                    onClick={()=>handleFileDelete(index)}
                    className="mt-1 mx-4 px-3 py-1 text-xs text-white bg-red-500 rounded hover:bg-slate-600"
                  >
                    Delete
                  </button>
                  </span>
                </div>))
              )}
              </div>
            </div>
    )
}

export default ProductImages;