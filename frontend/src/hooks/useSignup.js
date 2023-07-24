import { useState } from "react";
import { useAuthContext } from "./useAuth";


const useSignup = ()=>{
    const [isError , setIsError] = useState(null);
    const [isLoading , setIsLoading] = useState(null);
    const {user , dispatch}  = useAuthContext();
    const signup = async (email , password)=>{
        
        setIsLoading("Loading");
        const response = await fetch('/api/users/signup' , {
            method : 'POST',
            headers :{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({email ,password})
        })
    
        const json = await response.json();
    
        if(!response.ok){
            setIsLoading(null);
            setIsError(json.error);
        }
        if(response.ok){
            localStorage.setItem('user' , JSON.stringify(json));
    
            dispatch({type: 'LOGIN' , payload : json});
            setIsLoading(null);
            setIsError(null);
        }
    }
//    console.log(signup);
    return {isError , isLoading , signup };

}

export default useSignup;

