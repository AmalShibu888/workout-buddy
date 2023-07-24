
import {BrowserRouter as Router , Routes , Route, Navigate} from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Navbar from './components/Navbar'
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import { useAuthContext } from './hooks/useAuth.js';
function App() {
  const {user} = useAuthContext();
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
        <Routes>
          <Route 
            path='/'
            element ={user ?<Home />: <Navigate to='/login'/>}
          />
          <Route 
          path='/login'
          element = {!user ?<Login/>: <Navigate to='/'/>}
          />
          <Route 
          path='/signup'
          element = {!user ?<Signup/>: <Navigate to='/'/>}
          />
          
        </Routes>
        
        </div>
        
      </Router>
    </div>
  );
}

export default App;
