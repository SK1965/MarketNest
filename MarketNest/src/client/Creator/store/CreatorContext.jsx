import { createContext, useContext } from "react";


const LoginCheckcontext =  createContext({
    logindata:{ login: false, user: {} },
    onLogin : (user)=>{} , 
    onLogout : ()=>{},
    onUpdate : (data)=>{}
    
});

export const usecheckLogin = ()=>{
    return useContext(LoginCheckcontext)
}


export default LoginCheckcontext;