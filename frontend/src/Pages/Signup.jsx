import { useState } from "react"
import useSignup from "../hooks/useSignup";

const Signup = () => {

    const [email,setEmail] = useState('');

    const [password,setPassword] = useState('');

    const {signup , isError , isLoading} = useSignup();
    // console.log(useSignup());
    const submitEvent = async (e)=>{
        e.preventDefault();
        await signup(email, password);
    }

  return (
    <form className="signup" onSubmit={submitEvent}>
        <h3>Sign up</h3>
        <label>Email :</label>
        <input 
        type="text"
        value = {email}
        onChange={(e) =>setEmail(e.target.value)}
         />
         <label>Password :</label>
        <input 
        type="text"
        value = {password}
        onChange={(e) =>setPassword(e.target.value)}
         />
         <button disabled={isLoading} type="submit">{isLoading ? "Loading..." : "Sign up"}</button>

         {isError && <div className = "error">{isError}</div> }
    </form>
  )
}

export default Signup