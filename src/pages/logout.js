/* logout.js
 * This page is responsible for letting users logout of the app
 * All this does is destroy the localStorage variables. 
 * 
 * Daniel
 */

import React from 'react';

class Logout extends React.Component{
  
  // Logout the user.
  logout = () =>{
    localStorage.clear('_id');
    localStorage.clear('username');
    localStorage.clear('email');
    localStorage.clear('firstname',);
    localStorage.clear('lastname');
    localStorage.clear('hash');
    localStorage.clear('salt');
    localStorage.clear('role');
    window.open('/', "_self");
  }

  // Log out message
  render(){
    this.logout();
    return(
      <div className='text-center text-white'>
        <h1 className='textFont'>You are now being logged out</h1>
      </div>
    );
  }

}


export default Logout;