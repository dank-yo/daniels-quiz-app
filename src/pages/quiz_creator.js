/* quiz_creator.js
 * This page is responsible for allowing admins logged into the client to create a quiz
 * and upload it to the system. 
 * 
 * Daniel
 */

import React from "react";
import "./css/quiz-create.css";
import logo from '../img/logo.svg';
import axios from 'axios';

let questionCount = 2 // used to keep track of the question number
async function newQuestion(){ // all code for the create new questions section
    console.log(`testing new button ${questionCount}`)
    const questionSection = `<label class="questions">Question ${questionCount} 
                        <input
                        type="text"
                        placeholder="Question"
                        name="question${questionCount}"/>
                        <input
                        type="text"
                        placeholder="answer1"
                        name="question${questionCount}-answer1"/>
                        <input
                        type="text"
                        placeholder="answer2"
                        name="question${questionCount}-answer2"/>
                        <input
                        type="text"
                        placeholder="answer3"
                        name="question${questionCount}-answer3"/>
                        <input
                        type="text"
                        placeholder="answer4"
                        name="question${questionCount}-answer4"></input>
                        <input
                        type="number"
                        name="question${questionCount}-answer"
                        min="1"
                        max="4"/>
                    </label>`
    questionCount++
    let questionsLocation = document.getElementById("questions-section")
    let currentQuestions = questionsLocation.innerHTML
    currentQuestions += questionSection
    console.log(`status section: ${currentQuestions}`)
    questionsLocation.innerHTML = currentQuestions
    //console.log(questionSection)
}

class Creator extends React.Component{
    state = {
        title : "",
        question1 : "",
        q1a1 : "",
        q1a2 : "",
        q1a3 : "",
        q1a4 : "",
        q1ca : "",
        tags:[],
        date : "",
        
    }

    handleFormSubmission = async (event) => {
        event.preventDefault();
    
        const payload = {
          title: this.state.title,
          creator: localStorage.getItem('username'),
          creatorid: localStorage.getItem('_id'),
          
        };
    
        axios({
          url: 'http://localhost:8080/api/quiz/exam',
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
            this.errorHandlingServer();
            console.log('[Console]: Internal Server Error!');
          })
    }

    handleEventUpdate = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
    
        this.setState({
          [name]: value
        })
    };

    // Load quiz creator
    render(){
        return (
            <div className="text-center text-white">
                <h1 className="textFont"> Quiz Creator </h1>
                    <div className="w-100">
                    <form onSubmit={this.handleRegsitrationForm} autoComplete="off">
                <div className="w-100">
                    <label>Title:
                    <input 
                        type="text"
                        placeholder='Title'
                        className="form-control"
                        name='title'
                        value={this.state.title}
                        onChange={this.handleEventUpdate}
                        required/>
                    </label>                   
                </div>
                <div className="w-100"
                id="questions-section">
                    <label class="questions">Question 1
                        <input
                        type="text"
                        placeholder="Question"
                        name="question1"/>
                        {/* will need to set the value control still*/}
                        <input
                        type="text"
                        placeholder="answer1"
                        name="question1-answer1"/>
                        <input
                        type="text"
                        placeholder="answer2"
                        name="question1-answer2"/>
                        <input
                        type="text"
                        placeholder="answer3"
                        name="question1-answer3"/>
                        <input
                        type="text"
                        placeholder="answer4" 
                        name="question1-answer4"></input>
                        <input
                        type="number"
                        name="question1-answer"
                        min="1"
                        max="4"/>
                    </label>
                </div>
                <button type='button' onClick={newQuestion} className='btn btn-outline-light'>New Question</button>
                <button type='submit' onClick={this.handleFormSubmission} className='btn btn-outline-light'>Submit</button>
            </form>
        </div>
    </div>);
    }
}
export default Creator;
