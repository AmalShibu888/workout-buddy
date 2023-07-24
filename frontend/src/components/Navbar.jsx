import React from 'react'
import { Link } from 'react-router-dom'
import Login from '../Pages/Login'
import useLogout from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuth';

const Navbar = () => {

  const {user} = useAuthContext();
  const logout = useLogout();
  return (
    <header>
        <div className='container'>
          <Link to='/'>
            <h1>Workout Buddy</h1>
          </Link>
          <nav>{user ?(
            <div>
            <span>{user.user.email}</span>
            <button onClick={(e)=>logout()}>Log out</button> 
          </div>):
          (<div>
            <Link to='/login'>
              Login
            </Link>
            <Link to='/signup'>
              Signup
            </Link>
          </div>)
            }
            
          </nav>
        </div>
        
    </header>
  )
}

export default Navbar