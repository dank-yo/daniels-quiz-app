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
  /*
  return (
    <div className='text-center text-white'>
      <div className='form'>
        
        {isSubmitted ? <div>User is successfully logged in</div> : pageForm}
      </div>
    </div>
  );*/
}


export default Logout;

/**
 *  const handleSubmit = (event) =>{ // use this to handle the submission from the form
    event.preventDefault() //don't touch this
    var { uname, pass } = document.forms[0];
    console.log(uname, pass) // need to delete this in the final review
    //find user --> this will change with database connection
    const userData = database.find((user) => user.username === uname.value);

    if (userData) { //shouldn't need to change this
      if (userData.password !== pass.value){
        setErrorMessages({name: "pass", message: "Not a valid Password"})
      }else {
        setIsSubmitted(true);
        if(setIsSubmitted){ // set roll page
          if(userData.roll === "admin"){
            setTimeout(() => {
              window.open('teacher', "_self")
            }, 3000);
          } else if(userData.roll === "user"){
            setTimeout(() => {
              window.open('student', "_self")
            }, 3000);
          } else {
            setTimeout(() => {
              window.open('/', "_self")
            }, 3000);
          }
        }
      }
    } else{
      setErrorMessages({name: "uname", message: "Not a valid Username"})
    }
  }
const renderErrorMessage = (name) =>
  name === errorMessages.name && (
    <div className='error'>{errorMessages.message}</div>
  );
 */