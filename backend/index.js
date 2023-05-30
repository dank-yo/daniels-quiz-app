/* index.js
 * This page is the main backend page that node calls on when starting a server.
 * Backend plugins and routes should get called in here. 
 * 
 * Daniel
 */

const express = require('express');             // Back end web app framework

const morgan = require('morgan');               // HTTP requests nad errors logger
const mongoose = require("mongoose");           // Object Date Model for MongoDB
const cors = require('cors');                   // Prevent CORS errors when running server and client on different addresses
const path = require('path');                   // API router

const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URL = "mongodb://127.0.0.1:27017/quiz";

const routes = require('./routes/api.js');

//[Mongoose]: 
mongoose.connect(MONGODB_URL, () => {
        console.log("[Console]: Mongoose connected to MongoDB")
    },
    e => console.error(e)
);

//[Cors]:
app.use(cors());

//[Express]: 
//Json Parser
app.use(express.json());
//URL Encoder
app.use(express.urlencoded({extended: false}));

//[Morgan]: HTTP Request Tracker 
app.use(morgan('tiny'));

//[Router]: API router
app.use('/api', routes);

app.listen(PORT, console.log(`[Console]: Server started on port: ${PORT}`));
