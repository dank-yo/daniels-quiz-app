/* analytics.js
 * This page is responsible for displaying all of the quiz responses
 * This page should show respondents score, as well as a few other things. 
 * 
 * Daniel
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import "./css/quiz-create.css" //going to include analytics css in this file

let checkState = false

const tempBackend = [
  {"name":"Bob", "correct":"3", "incorrect":"0", "percent": "100"},
  {"name":"Jeff", "correct":"1", "incorrect":"2", "percent": "33"},
]

async function loadGrades(){
  if(checkState == false){ 
    checkState = true
    // put this in a loop maybe? depending on how many grades there are?
    for(let i = 0; i < tempBackend.length; i++){
      // assume to replace these with axios request
      let name = tempBackend[i]["name"]
      let correct = tempBackend[i]["correct"]
      let incorrect = tempBackend[i]["incorrect"]
      let percent = tempBackend[i]["percent"]

      console.log(name, correct, incorrect, percent)
      let messageToAdd = `
      <div class="analytics-box">
      <h3 class="analytics"> Name: ${name}</h3>   
      <h3 class="analytics">Correct Answers: ${correct}</h3>   
      <h3 class="analytics">Incorrect Answers: ${incorrect}</h3>   
      <h3 class="analytics">Percent: ${percent}</h3>
      </div>`

      const locationOfGrades = document.getElementById("student-grades")
      let currentMessage = locationOfGrades.innerHTML
      currentMessage += messageToAdd
      locationOfGrades.innerHTML = currentMessage
    }
  }
  
}

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
          <button onClick={loadGrades} className='btn btn-outline-light'>Click To Load Grades</button>
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