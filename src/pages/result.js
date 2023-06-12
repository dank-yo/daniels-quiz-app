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
  
      const results = result.map((r, index) => (
        <div key={index}>
          <h1>{r.username}</h1>
          <div className="d-flex justify-content-center m-2 p-2">
            <div style={{width: '40%' }}>
              <GaugeChart
                id="gauge-chart"
                width={'50%'}
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
            </div>
            <p>Total Correct: {r.correct} | Total Incorrect: {r.incorrect}</p>
        </div>
      ));
  
      return (
        <div>
          <h4>for</h4>
          {quizTaken}
          {results}
        </div>
      );
    }
  
    render() {
      const { error, quiz, results } = this.state;

      return (
        <div className='text-center text-white container'>
          <h1>Your Result</h1>
          {error ? (
            <div>{error}</div>
          ) : (
            <div className='text-center text-white'>
              {this.displayQuizResult(quiz, results)}
            </div>
          )}
        </div>
      )
    }
  }

export default Results;