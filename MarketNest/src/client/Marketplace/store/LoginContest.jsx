import { createContext, useContext } from "react";


const LoginContext = createContext({logindata : {
    login : false , 
    user : {}
},
onLogin : (user)=>{},
onLogout : ()=>{} , 
onUpdate  :(data)=>{}
})

export default LoginContext;


export const useCheckLogin = ()=>{
    return useContext(LoginContext)
 }
 




