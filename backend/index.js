/* index.js
 * This page is the main backend page that node calls on when starting a server.
 * Backend plugins and routes should get called in here. 
 * 
 * Daniel
 */

const config = require('./config');

const express = require('express');             // Back end web app framework

const morgan = require('morgan');               // HTTP requests nad errors logger
const mongoose = require("mongoose");           // Object Date Model for MongoDB
const cors = require('cors');                   // Prevent CORS errors when running server and client on different addresses
const path = require('path');                   // API router
const routes = require('./routes/api.js');

const app = express();
const PORT = process.env.PORT || config.backend.port;

const MONGODB_URL = config.database.url + ":" + config.database.port + "/" + config.database.dbname;

//[Mongoose]: 
mongoose.connect(MONGODB_URL, () => {
        console.log("[Console]: Mongoose connected to MongoDB ", MONGODB_URL)
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
