/* exam.js
 * This page is responsible for the actual exam portion.
 * Should grab a quiz from the database then give the user to solve questions
 * 
 * Daniel
 */

import React from 'react';
import axios from 'axios';

class Exam extends React.Component{
    state = {
        quizID:'',
        posts:[]
    }

    // Calls whenever the React Component mounts.
    componentDidMount = () => {
        const quizID = localStorage.getItem('quizID');
        this.setState({ quizID });
        this.getQuiz(quizID);
      }

    // Get a quiz
    getQuiz = (quizID) => {
      axios.get(`http://localhost:8080/api/quiz/exam/${quizID}`)
        .then((response) => {
          const data = response.data;
          console.log(data); // Check the received data in the console
          this.setState({ posts: data }, () => {
            console.log("State updated:", this.state.posts); // Check the updated state in the console
          });
          console.log("Data retrieved!", data);
        })
        .catch((error) => {
          console.log("Error!", error);
        });
    }
    // Returns a map of posts.
    displayQuiz = (quizzes) => {
        console.log("Displaying quizzes:", quizzes);
        if (!Array.isArray(quizzes)) {
          return null; // Return early if quizzes is not an array
        }
        
        return quizzes.map((quiz, index) => (
          <div id={index} key={index}>
            <form>
              <h1 id={quiz.title}>{quiz.title}</h1>
              <p id={quiz.creator}>By {quiz.creator}</p>
              {quiz.questions.map((question, questionIndex) => (
                <div key={questionIndex}>
                  <p>#{questionIndex + 1}: {question.question}</p>
                  {question.options.map((option, optionIndex) => (
                    <div className="radio" key={optionIndex}>
                      <label>
                        <input type="radio" name={`q${index + 1}`} value={`option${optionIndex + 1}`} />
                        {option}
                      </label>
                    </div>
                  ))}
                  <br></br>
                </div>
              ))}
              <button type="button" className="btn btn-outline-light">Submit</button>
            </form>
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
        return (
          <div>
            <div className='text-center text-white container'>
                
              {this.displayQuiz(this.state.posts)}
            </div>
          </div>
        );
      }
}

export default Exam;