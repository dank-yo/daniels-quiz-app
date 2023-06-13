/* analytics.js
 * This page is responsible for displaying all of the quiz responses
 * This page should show respondents score, as well as a few other things. 
 * 
 * Daniel
 */

import React from 'react';
//import axios from 'axios';

import "./css/quiz-create.css" //going to include analytics css in this file

class Analytics extends React.Component{
    state = {
        posts:[]
    }

  //Calls whenever the React Component mounts.
  componentDidMount = () => {
    
  }


  handleEventUpdate = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    })

  };

  render(){
    return(
      <div className='text-center text-white container'>
        <h1>Quiz Analytics</h1>
        <br></br>
        <div className='text-center text-white'>
          <h3>Please Select A Quiz From Below To Grade</h3>
          <button className='btn btn-outline-light'>Click To Load Grades</button>
        </div>
        <br></br>
        <div className='text-center text-white'>
          <hr></hr>
          <div id='student-grades' className='d-flex'> </div>
        </div>
      </div>
    )
  }
    
}

export default Analytics;