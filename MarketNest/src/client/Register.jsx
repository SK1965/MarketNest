import MarketplaceRegistration from "./Marketplace/components/Registration"
import CreatorRegistration from "./Creator/components/Registration"
import Typewriter from "./TypeWriter"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
export default function Register(){
    const location = useLocation();
    const [Type, setType] = useState(location.state?.userType || "");
    const navigate = useNavigate();
    useEffect(() => {
        console.log('Location State:', location.state);
        if (location.state && location.state.userType) {
            console.log('User Type:', location.state.userType);
            setType(location.state.userType);
            
        }
    }, [location]);

    
    const userLogin = ()=>{
         setType("User")
    
    }
    const creatorLogin = ()=>{
        setType("Creator")
    }
    return(
     <>
     
    <div className="fixed">
        <nav className="w-screen py-3 bg-gradient-to-r from-indigo-100 via-red-300 to-orange-100  shadow">
                <div className="container mx-auto  py-8 flex justify-between items-center">
                    <div className=" absolute left-10 text-4xl font-bold">
                        <span className="text-green-600">Market</span>Nest
                    </div>
                   
                </div>
            </nav> 

        <div className="flex">
            
       <fieldset className="w-3/5  bg-gradient-to-b from-red-500 via-indigo-500  to-orange-400 brightness-50 h-screen ">
       <div className=" absolute bottom-1/4 left-32  w-[550px] space-y-8 ">
            <div className="pt-6 px-10 border-2 border-gray-800 rounded-2xl hover:opacity-70 hover:border-green-500 hover:border-4 hover:scale-110  "
            onClick ={userLogin}>
                <span className="text-xl font-semibold text-slate-50">Experience the future of digital innovation</span> <br />
                <div className=" h-20 text-4xl font-bold text-orange-100 font-feature"> <Typewriter >For Customers,</Typewriter></div> 
            </div>
            <div className=" pt-6 px-10 border-2 border-gray-800 rounded-2xl hover:opacity-70 hover:border-green-500 hover:border-4 hover:scale-110  "
             onClick={creatorLogin}
            >
                <span className="text-xl font-semibold text-slate-50">Boost your efficiency and stay organized</span> <br />
                <div className=" h-20 text-4xl font-bold text-amber-200 font-feature"> <Typewriter >For Creators,</Typewriter></div> 
            </div>
       </div>
       </fieldset>

       
       <fieldset className="w-full relative h-screen boder border-black bg-gradient-to-r from-indigo-600 via-gray-500 to-cyan-600 ring-offset-fuchsia-00" >
       { Type===""&&  
       <div className="absolute  pl-40 top-1/3 right-1/4 justify-between content-center text-5xl font-feature ">
       Elevate your digital experience with our expertly designed products,
       <div className="bg-gradient-to-r from-red-700 via-white to-indigo-700  text-transparent bg-clip-text py-4 font-feature">
       <Typewriter >engineered for your success.</Typewriter> 
       </div> 
       </div>}

         <div className=" bg-transparent left-1/4">

         
         
       {Type=="User" && <MarketplaceRegistration/> }
       {Type=="Creator" && <CreatorRegistration/> }
        </div>
       </fieldset>

        </div>
    </div>
    </>
    )
}