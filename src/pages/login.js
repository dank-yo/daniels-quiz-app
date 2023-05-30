/* login.js
 * This page is responsible for letting users login to the app
 * 
 * Daniel
 */


import React, { useState } from 'react';
import axios from 'axios';
import "./css/error.css"

class Login extends React.Component{

  state = {
    email: '',
    passwrd: '',
    redirect: false
  };

  //[errorMessages, setErrorMessages] = useState({});
  //[isSubmitted, setIsSubmitted] = useState(false);
  errors = {
    eml: "Invalid email",
    pass: "Invalid password"
  };

  //gets the current target getting updated
  //this is redundant, but I do not have the time to clean this up atm.
  handleEventUpdate = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    })
  };
  // Internal error handling
  errorHandlingServer =() => {
    const message = ["<br></br><h3> There was an internal error. Please try again later </h3><br></br>"]
    const placeLocation = document.getElementById("error-section")
    placeLocation.innerHTML = message;
    let col = "red";
    placeLocation.style.borderColor = col;
  }
  // Invalid username/password error handling
  errorHandlingLogin =() => {
    const message = ["<br></br><h3> Invalid username or password </h3><br></br>"]
    const placeLocation = document.getElementById("error-section")
    placeLocation.innerHTML = message;
    let col = "red";
    placeLocation.style.borderColor = col;
  }


  handleLoginForum = async (event) =>{
    event.preventDefault();

    const payload = {
      email: this.state.email,
      password: this.state.passwrd
    };

    axios({
      url: 'http://localhost:8080/api/login',
      method: 'POST',
      data: payload
    })
      //User redirect needs to go in this statement.
      .then((res) => {
        console.log('[Console]: You are now logged in as', res.data.username);
        if(res.data.username === undefined){
          this.errorHandlingLogin();
        } else {
          localStorage.setItem('_id', res.data._id);
          localStorage.setItem('username', res.data.username);
          localStorage.setItem('email', res.data.email);
          localStorage.setItem('firstname', res.data.name.firstname);
          localStorage.setItem('lastname', res.data.name.lastname);
          localStorage.setItem('hash', res.data.password.hash);
          localStorage.setItem('salt', res.data.password.salt);
          localStorage.setItem('role', res.data.role);
          window.open('/', "_self");
        }
      })
      //Error handling should be sent to a notification box on the DOM
      .catch(() => {
        this.errorHandlingServer();
        console.log('[Console]: Internal Server Error!');
      })
  }

  render(){
    // Generates a form to log in a user.
    return(
      <div className='text-center text-white'>
        <h1 className='textFont'>Login</h1>
        <div className='text-center text-red' id='error-section'>
        </div>
        <div className="container mt-3">
          <form onSubmit={this.handleLoginForum} autoComplete="off">
            <div className="mb-3 mt-3">
            <label>Email:
              <input 
                type="email"
                placeholder='placeholder@example.com'
                className="form-control"
                name='email'
                value={this.state.email}
                onChange={this.handleEventUpdate}
                required
              />
            </label>
            </div>
            <div className="mb-3">
              <label>Password:
                <input 
                  type="password" 
                  className="form-control"
                  name="passwrd"
                  value={this.state.passwrd}
                  onChange={this.handleEventUpdate}
                  required/>
              </label>
            </div>
            <button type="submit" className="btn btn-outline-light">Submit</button>
            <a href='/register' className='btn btn-outline-light' >Dont have an account?</a>
          </form>
        </div>
      </div>
    );
  }
}


export default Login;
