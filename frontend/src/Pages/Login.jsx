import { useState } from "react"
import useLogin from "../hooks/useLogin";

const Login = () => {

    const {login , isError , isLoading} = useLogin();
    const [email,setEmail] = useState('');

    const [password,setPassword] = useState('');

    const submitEvent = async (e)=>{
        e.preventDefault();
        await login(email,password);
    }

  return (
    <form className="login" onSubmit={submitEvent}>
        <h3>Login</h3>
        <label>Email :</label>
        <input 
        type="text"
        value = {email}
        onChange={(e) =>{setEmail(e.target.value)}}
         />
         <label>Password :</label>
        <input 
        type="text"
        value = {password}
        onChange={(e) =>{setPassword(e.target.value)}}
         />
         <button disabled={isLoading} type="submit">{isLoading ? "Loading...": "Login"}</button>

         {isError && <div className="error">{isError}</div>}
    </form>
  )
}

export default Login