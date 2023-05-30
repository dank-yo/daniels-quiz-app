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
        this.state.quizID = localStorage.getItem('quizID')
        this.getQuiz();
      }


    // Get a quiz
    getQuiz = (id) => {
        axios.get('http://localhost:8080/api/quiz/exam', {params:{quizID: id}})
            .then((response) => {
                const data = response.data;
                this.setState({posts: data})
                console.log("Data retrieved!", data);
            })
            .catch((e) => {
                console.log("Error!", e)
            })
    }


    // Returns a map of posts.
    displayQuiz = (posts) => {
        const map = posts.map((post, index) => (
            <div id={index} key={index}>
            <form>
                <h1 id={post.title}>{post.title}</h1>
                <p id={post.creator}>By {post.creator}</p>
                <p>#{index+1}: {post.questions.q1.question}</p>
                <div className="radio">
                    <label>
                        <input type="radio" value="option1" checked={true} />
                        {post.questions.q1.options.a1}
                    </label>
                    </div>
                    <div className="radio">
                    <label>
                        <input type="radio" value="option2" />
                        {post.questions.q1.options.a2}
                    </label>
                    </div>
                    <div className="radio">
                    <label>
                        <input type="radio" value="option3" />
                        {post.questions.q1.options.a3}
                    </label>
                    </div>
                    <div className="radio">
                    <label>
                        <input type="radio" value="option3" />
                        {post.questions.q1.options.a4}
                    </label>
                </div>
                <br></br>
                <p>#{index+2}: {post.questions.q2.question}</p>
                <div className="radio">
                    <label>
                        <input type="radio" value="option1" checked={true} />
                        {post.questions.q2.options.a1}
                    </label>
                    </div>
                    <div className="radio">
                    <label>
                        <input type="radio" value="option2" />
                        {post.questions.q2.options.a2}
                    </label>
                    </div>
                    <div className="radio">
                    <label>
                        <input type="radio" value="option3" />
                        {post.questions.q2.options.a3}
                    </label>
                    </div>
                    <div className="radio">
                    <label>
                        <input type="radio" value="option3" />
                        {post.questions.q2.options.a4}
                    </label>
                </div>
                <br></br>
                <p>#{index+3}: {post.questions.q3.question}</p>
                <div className="radio">
                    <label>
                        <input type="radio" value="option1" checked={true} />
                        {post.questions.q3.options.a1}
                    </label>
                    </div>
                    <div className="radio">
                    <label>
                        <input type="radio" value="option2" />
                        {post.questions.q3.options.a2}
                    </label>
                    </div>
                    <div className="radio">
                    <label>
                        <input type="radio" value="option3" />
                        {post.questions.q3.options.a3}
                    </label>
                    </div>
                    <div className="radio">
                    <label>
                        <input type="radio" value="option3" />
                        {post.questions.q3.options.a4}
                    </label>
                </div>
                <br></br>
                <button type='button' className='btn btn-outline-light'>Submit</button>
            </form>
            </div> 
        ));

        return map ;
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
    render(){
        return(
            <div className='text-center text-white container'>
                {this.displayQuiz(this.state.posts)}
            </div>
        );
    }
}

export default Exam;