import { useState } from "react";
import { useAuthContext } from "./useAuth";


const useLogin = ()=>{
    const [isError , setIsError] = useState(null);
    const [isLoading , setIsLoading] = useState(null);
    const { dispatch}  = useAuthContext();
    const login = async (email , password)=>{
        
        setIsLoading("Loading...");
        const response = await fetch('/api/users/login' , {
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
    return {isError , isLoading , login };

}

export default useLogin;

