import React from 'react'
import { useHistory } from 'react-router-dom';
import logo from "../components/images/logo.png"

function Navbar() {

    const history = useHistory();

    const handleLogout = () => {
        // Clear the token from localStorage
        localStorage.removeItem('token');

        // Redirect to the login page
        history.push('/');
    };

  return (
    <div className='navbarcontainer'>
        <div className='navbarlogoContainer'>
            <img src={logo} alt="logo" height={50} width={50}/>
            <p>Oorugallu Ruchullu</p>
        </div>
        <ul className='unorderlistcomntainer'>
            
            <li onClick={handleLogout}>Logout</li>
        </ul>
      
    </div>
  )
}

export default Navbar
