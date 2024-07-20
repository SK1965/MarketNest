import { createContext ,useContext } from "react";



const ProductContext = createContext({
                                    product :{},
                                    fetchProducts : (search)=>{},
                                    fetchProductbyId : (ids)=>{} ,
                                    onUpdate : (data )=>{}
                                  })

export default ProductContext;

export const useProduct = ()=>{
    return useContext(ProductContext)
}