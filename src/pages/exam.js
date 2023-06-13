/* exam.js
 * This page is responsible for the actual exam portion.
 * Should grab a quiz from the database then give the user to solve questions
 * 
 * Daniel
 */

import React from 'react';
import axios from 'axios';

import { API_BASE_URL } from '../config';

class Exam extends React.Component{
    state = {
        posts:[],
        selectedOptions: {},
        error: null
    }

    // Calls whenever the React Component mounts.
    componentDidMount = () => {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const quizID = params.get('id');
      this.getQuiz(quizID);
    }

    // Get a quiz
    getQuiz = async (quizID) => {
      axios.get(`${API_BASE_URL}/exam?id=${quizID}`)
        .then((response) => {
          const data = response.data;
          const dataArray = data ? [data] : [];
          this.setState({ posts: dataArray })
        })
        .catch((error) => {
          console.log("Error!", error);
        });
    }

    // Prepare and handle quiz results to be uploaded
    submitQuiz = () => {
      const { posts, selectedOptions } = this.state;
    
      const quizData = posts[0];

      const checkAnswers = quizData.questions.map((question, index) => {
        return question.answer === selectedOptions[index];  
      });

      const countCorrectAnswers = (answers) => {
        const trueCount = answers.filter((answer) => answer === true).length;
        return trueCount;
      }

      const countIncorrectAnswers = (answers) => {
        const falseCount = answers.filter((answer) => answer === false).length;
        return falseCount;
      }

      const totalCorrectAnswers = countCorrectAnswers(checkAnswers);
      const totalIncorrectAnswers = countIncorrectAnswers(checkAnswers);
      const totalQuestions = checkAnswers.length;

      const calcPercentage = (totalCorrectAnswers/totalQuestions);

      const payload = {
        quizid: quizData._id,
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
        userID : localStorage.getItem('_id'),
        answers : selectedOptions,
        correct: totalCorrectAnswers,
        incorrect: totalIncorrectAnswers,
        percentage: calcPercentage,
        date : Date('<YYYY-mm-ddTHH:MM:ss>')
      }

      axios({
        url: `${API_BASE_URL}/exam/submit`,
        method: 'POST',
        data: payload
      })
      .then(res => {
        // Handle the successful upload
        console.log('Submission uploaded successfully!', res);
        const redirectUrl = res.data.redirectUrl;
        window.location.href = redirectUrl;
      })
      .catch(error => {
        // Handle the error
        console.log('Error uploading submission:', error);
      });
    }

    // Returns a map of posts.
    displayQuiz = (quizzes) => {
        if (!quizzes) {
          return (<div>Error! Unable to display quizzes.</div>); // Return early if quizzes is not an array
        }

        const handleOptionChange = (questionIndex, optionIndex) => {
          this.setState(prevState => ({
            selectedOptions: {
              ...prevState.selectedOptions,
              [questionIndex]: optionIndex
            }
          }), () => {
            //console.log(this.state.selectedOptions);
          });
        };
        
        return quizzes.map((quiz, index) => (
          <div id={index} key={index}>
              <h1 id='title'>{quiz.title}</h1>
              <p id='creator'>By {quiz.creator}</p>
              <div className='container w-100 m-0 p-0' style={{textAlign: 'left', maxHeight: '60vh', overflow: 'auto' }}>
              {quiz.questions.map((question, questionIndex) => (
                <div key={questionIndex} id={'q'+(questionIndex+1)} className='w-50 mx-auto bg-dark-transparent m-2 p-2 rounded'>
                  <p>#{questionIndex + 1}: {question.question}</p>
                  {question.options.map((option, optionIndex) => (
                    <div className="radio" key={optionIndex}>
                      <label> 
                      <input
                        type="radio"
                        name={`q${questionIndex + 1}`}
                        id={`q${questionIndex + 1}`}
                        value={`option${optionIndex + 1}`}
                        checked={this.state.selectedOptions[questionIndex] === optionIndex}
                        onChange={() => handleOptionChange(questionIndex, optionIndex)}
                      /> {option}
                      </label>
                    </div>
                  ))}
                  <br></br>
                </div>
              ))}
              </div>
              <br></br>
              <button type="button" className="btn btn-outline-light" onClick={this.submitQuiz}>Submit</button>
          </div>
        ));
      }
    
    // Updates the state of the target.
    handleEventUpdate = (event) => {
        const target = event.target;
        const name = target.name; 
        const value = target.value;
    
        this.setState({
          [name]: value
        })
      };


    // Renders quiz
    render() {
      const { posts, error } = this.state;
        return (
          <div>
            {error && <p>Error: {error.message}</p>}
            <div className='text-center text-white container'>
              {this.displayQuiz(posts)}
            </div>
          </div>
        );
      }
}

export default Exam;