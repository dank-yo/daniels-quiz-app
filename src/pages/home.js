/* home.js
 * This is the home/about page. Not much going on here.
 * 
 * Daniel
 */

import React from 'react';
import logo from '../img/logo.svg';

class Home extends React.Component{
  render(){
    // If email blank
    if(localStorage.getItem('email') == null){
      // Welcome page
      return(
        <div className='text-center text-white'>
          <h1 className='textFont'>Welcome</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <h3 className='textFont'>To get started, please login or register for an account.</h3>
          <br></br><br></br>
        </div>
  
      );
    }else{
      // log in message
      return(
        <div className='text-center text-white'>
          <h1 className='textFont'>Welcome</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <h3 className='textFont'>You are logged in as {localStorage.getItem('firstname') + " " + localStorage.getItem('lastname')}</h3>
          <br></br><br></br>
        </div>
  
      );
    }
    
  }
}
  
export default Home;