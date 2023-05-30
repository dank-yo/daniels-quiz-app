/* index.js
 * This index.js file is the frontend client that is called when a node server is created.
 * Modules and global CSS should get called in here. 
 * 
 * Daniel
 */

/* React Imports */
import React from 'react';
import ReactDOM from 'react-dom/client';

import Nav from './Nav';
import reportWebVitals from './reportWebVitals';

/* CSS IMPORTS */
import './Nav.css';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';

// renders the main/root page of the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Nav/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
