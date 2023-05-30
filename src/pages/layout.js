/* layout.js
 * This page is responsible for creating the actual navigation bar at the top of the page
 * The navbar changes based on the login status of a person on the client
 * Any changes to the navbar should be made here 
 * 
 * Daniel
 */

import { Outlet, Link } from "react-router-dom";
import './css/layout.css';
import logo from '../img/logo.svg';

const Layout = () => {
  // If email or username is blank
  if(localStorage.getItem('email') == null || localStorage.getItem('username') == null){
    // Load buttons
    return (
      <>
      <div className="p-2">
      <img src={logo} className="App-logo m-0 p-0" alt="logo" style={{width: 60, height: 60}}></img>
          <Link to="/"><button className='btn btn-outline-light'>Home</button></Link>
          <Link to="/login"><button className = 'btn btn-outline-light'>Login</button></Link>
          <Link to="/register"><button className = 'btn btn-outline-light'>Register</button></Link>
      </div>
      <Outlet />
      </>
    )
  }
  // Email and username not blank
  else{
    // Show logout button instead of login
    return (
      <>
      <div className="p-2">
      <img src={logo} className="App-logo m-0 p-0" alt="logo" style={{width: 60, height: 60}}></img>
        <Link to="/"><button className = 'btn btn-outline-light'>Home</button></Link>
        <Link to="/dashboard"><button className = 'btn btn-outline-light'>Dashboard</button></Link>
        <Link to="/logout"><button className = 'btn btn-outline-light'>Logout</button></Link>
      </div>
      <Outlet />
      </>
    )
  }

};

export default Layout;