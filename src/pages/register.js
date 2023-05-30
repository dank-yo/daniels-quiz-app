/* register.js
 * This page is responsible for letting the user register for an account.
 * This page encrypts the password on the front end before ever getting sent to the client.
 * 
 * Daniel
 */

import React from 'react';
import axios from 'axios';
import "./css/error.css"

import bcrypt from "bcryptjs-react";


class Register extends React.Component{

  state = {
    username: '',
    firstname: '',
    lastname: '', 
    passwrd: '',
    posts: []
  };

  //gets the current target getting updated
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
  errorHandlingRegister =() => {
    const message = ["<br></br><h3> Invalid username or password </h3><br></br>"]
    const placeLocation = document.getElementById("error-section")
    placeLocation.innerHTML = message;
    let col = "red";
    placeLocation.style.borderColor = col;
  }

  // Account registration
  handleRegsitrationForm = async (event) =>{
    event.preventDefault();

    var salt = await bcrypt.genSaltSync(10);
    var hash = await bcrypt.hash(this.state.passwrd, salt);

    const payload = {
      username: this.state.username,
      password:{
        hash: hash,
        salt: salt
      },
      name:{
        firstname: this.state.firstname,
        lastname: this.state.lastname,
      },
      email: this.state.email,
      role: "user",
      lastlogin: new Date()
    };

    axios({
      url: 'http://localhost:8080/api/register',
      method: 'POST',
      data: payload
    })
      //User redirect needs to go in this statement.
      .then(response => {
        //console.log(response.status) // use this to test response status from server
        console.log('[Console]: Data has been sent to the server!');
        window.open('login', "_self");
      })
      //Error handling should be sent to a notification box on the DOM
      .catch(() => {
        this.errorHandlingRegister();
        console.log('[Console]: Internal Server Error!');
      })
  }

  

  // Registration form
  render(){
    return (
      <div className='text-center text-white'>
        <h1 className='textFont'>Registration</h1>
        <div className='text-center text-red' id='error-section'>
        </div>
        <div className="container mt-3">
          <form onSubmit={this.handleRegsitrationForm} autoComplete="off">
            <div className="mb-3 mt-3 form-outline form-white">
              <label>Username:
              <input 
                type="text" 
                className="form-control"
                name='username'
                value={this.state.username}
                onChange={this.handleEventUpdate}
                required/>
              </label>
            </div>
            <div className="mb-3 mt-3 form-outline form-white">
              <label>Firstname:
              <input 
                type="text" 
                className="m-2 form-control"
                name='firstname'
                placeholder='John'
                value={this.state.firstname}
                onChange={this.handleEventUpdate}
                required/>
              </label>
              <label>Lastname:
              <input 
                type="text" 
                className="m-2 form-control"
                name='lastname'
                placeholder='Doe'
                value={this.state.lastname}
                onChange={this.handleEventUpdate}
                required/>
              </label>
            </div>
            <div className="mb-3 form-outline form-white">
              <label>Email:
              <input 
                type="email" 
                placeholder='placeholder@example.com'
                className="form-control"
                name='email'
                value={this.state.email}
                onChange={this.handleEventUpdate}
                required/>
              </label>
            </div>
            <div className="mb-3 form-outline form-white">
              <label>Password:
              <input 
                type="password" 
                className="form-control"
                name='passwrd'
                value={this.state.passwrd}
                onChange={this.handleEventUpdate}
                required/>
              </label>
            </div>
          <a href='/login' className='btn btn-outline-light' >Already a user?</a>
          <button type="submit" className="btn btn-outline-light">Submit</button>
        </form>
      </div>
    </div>
    );
  }
}

export default Register;