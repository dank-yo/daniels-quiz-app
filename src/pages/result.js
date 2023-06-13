/* analytics.js
 * This page is responsible for displaying all of the quiz responses
 * This page should show respondents score, as well as a few other things. 
 * 
 * Daniel
 */

import React from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

import "./css/quiz-create.css" //going to include analytics css in this file

import GaugeChart from 'react-gauge-chart';

class Results extends React.Component{

    state = {
        results:[],
        quiz:[],
        error: null
    }

    //Calls whenever the React Component mounts.
    componentDidMount = () => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const resultID = params.get('id');
        this.getQuizResult(resultID);
    }

    formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
      return date.toLocaleDateString('en-US', options);
    };


    getQuizResult = (resultID) => {
      axios.get(`${API_BASE_URL}/result?id=${resultID}`)
        .then((res) => {
          const data = res.data;
          const dataArray = data ? [data] : [];
          this.setState({ results: dataArray });
          if (dataArray.length > 0) {
            const quizID = dataArray[0].quizid;
            this.getQuiz(quizID);
          }
        })
        .catch((err) => {
          console.log("Error!", err);
        });
    }

    getQuiz = (quizID) => {
      axios.get(`${API_BASE_URL}/exam?id=${quizID}`)
        .then((response) => {
          const data = response.data;
          const dataArray = data ? [data] : [];
          this.setState({ quiz: dataArray })
        })
        .catch((error) => {
          console.log("Error!", error);
        });
    }

    displayQuizResult = (quiz, result) => {
  
      const quizTaken = quiz.map((q, index) => (
        <div key={index}>
          <h1>{q.title}</h1>
        </div>
      ));

      const redirectToDashboard = () => {
        window.location.href = '/dashboard';
      };
  
      const results = result.map((r, index) => (
        <div key={index}>
          <p>Date Submitted: {this.formatDate(r.date)}</p>
          <div className="d-flex justify-content-center m-2 p-2">
              <GaugeChart
                id="gauge-chart"
                width={'100%'}
                animate={false}
                arcPadding={0}
                cornerRadius={0}
                colors={["#770077", "#FF00FF"]}
                needleColor='#FF00FF'
                needleBaseColor='#770077'
                nrOfLevels={20}
                percent={r.percentage} // Assuming the result object has a 'score' property with the percentage value
              />
              </div>
            <p>Total Correct: {r.correct} | Total Incorrect: {r.incorrect}</p>
            <button className='btn btn-outline-light' onClick={redirectToDashboard}>↺ Return to Dashboard</button>
        </div>
      ));
  
      return (
        <div>
          {quizTaken}
          {results}
        </div>
      );
    }
  
    render() {
      const { error, quiz, results } = this.state;

      return (
        <div className='text-center text-white container'>
          <h1>Your Results</h1>
          <h4>for</h4>
          <br></br>
          {error ? (
            <div>{error}</div>
          ) : (
            <div className='w-100 container d-flex'>
              <div className='text-center text-white bg-dark-transparent m-2 p-2 w-50 rounded'>
                {this.displayQuizResult(quiz, results)}
              </div>
            </div>
          )}
        </div>
      )
    }
  }

export default Results;