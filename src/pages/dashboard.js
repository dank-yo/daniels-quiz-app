/* dashboard.js
 * This page is responsible for handling most of the generic user functions on the DOM.
 * Users and admins should be able to load quizes as well as other account related stuff.
 * 
 * Daniel
 */

import React from 'react';
import axios from 'axios';
import './css/dashboard.css';

import { API_BASE_URL } from '../config';

class Dashboard extends React.Component{

  // default state of quiz
    state = {
        posts : [],
        error: null
    }

    // Calls whenever the React Component mounts.
    componentDidMount = () => {
      this.getQuizListings();
    }

    // Handle a click on the quiz.
    quizIDRedirect = (quizID) => {
      window.open(`exam?id=${quizID}`, "_self");
    };

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

    // Returns available quizzes.
    getQuizListings = () => {
      axios.get(`${API_BASE_URL}/selection`)
        .then((response) => {
            const data = response.data;
            this.setState({posts: data})
            //console.log("Data retrieved!");
        })
        .catch((e) => {
          console.log("Error!", e)
        })
    }

    displayQuizListings = (posts, role) => {
      // Do nothing if there are no quizzes
      if (!posts.length) {
        return null;
      }
    
      // Returns the appropriate quiz listings based on the role
      return posts.map((post, index) => (
        <div id={index} key={index}>
          <div className="align-center text-left">
            <div className="flex-column">
              <h3 className="align-center">{post.title}</h3>
              <p></p>
            </div>
            <p className="align-center">Uploaded: {post.date} by {post.creator}</p>
            <button
              id={post._id}
              type="button"
              className="btn btn-outline-light"
              onClick={() => this.quizIDRedirect(post._id)}
            >
              Load
            </button>
            <br></br>
            <br></br>
          </div>
        </div>
      ));
    };

  render(){
    //React.useLayoutEffect(() => {
    //    NavigationPreloadManager.setOptions({headerShown: false});
    //});
    // the above code could be used in some way to remove the nav bar from the top of the page

    // If not logged-in
    if (!localStorage.getItem('firstname') || !localStorage.getItem('lastname')) {
      return (
        <div className='text-center text-white'>
          <h1 className='textFont'>Dashboard</h1>
          <code>Error! You must be logged in to do that!</code>
          <div>
            <a href='/login' className='btn text-white btn-outline'>Return to login</a>
          </div>
        </div>
      );
    }

    
    // Generates a unique identifier for the local storage.
    const name = `${localStorage.getItem('firstname')} ${localStorage.getItem('lastname')}`;
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    
    /* Realisitcally this should get verified with a server session variable
      * So that someone cannot go in and change their role on the local end and 
      * gain unauthorized access. This is just here as proof of concept for now
      */
    // If admin, show dashboard with quiz creater and analytics/grades
    return (
    <div className='container'>
      <div className='text-center text-white m-2 p-2'>
        <h1 className='textFont'>Dashboard</h1>
        <br /><br />
        <div className='row dashboard-row'>
          <div className=' col-sm-3 m-2 p-2 bg-dark-transparent rounded'>
            <h4 className='textFont'>Welcome Back</h4>
            <hr />
            <div className='overflow-fix'>
              <p className='textFont'>{name}</p>
              <p className='textFont'>username: {username}</p>
              <p className='textFont'>email: {email}</p>
            </div>
          {role === 'admin' && (
          <>
            <p className='textFont'>Role: <code>{role}</code></p>
            <a href='/quiz-creator' className='btn btn-outline-light w-100'>Create A Quiz</a>
            <a href='/analytics' className='btn btn-outline-light w-100'>Quiz Analytics/Grades</a>
          </>
          )}
          </div>
        <div className='col-sm-7 m-2 p-2 bg-dark-transparent rounded'>
          <h2>All Quizzes</h2>
          <hr />
          <div className='quizzes'>
            {this.displayQuizListings(this.state.posts, role)}
          </div>
          </div>
        </div>
      </div>
    </div>
  )}
}

export default Dashboard;