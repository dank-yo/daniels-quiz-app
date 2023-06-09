/* api.js
 * This page is responsible for taking all the get and post requests made
 * by the client and then querys mongo for results. Those results are then
 * sent back to the client and formatted to display.
 * 
 * Daniel
 */

const express = require('express');
const session = require('express-session');

const app = express();
const router = express.Router();

const store = new session.MemoryStore();

//Mongoose Schemas:
const mongoose = require('mongoose');
const User = require("../schema/User");
const Quiz = require("../schema/Quiz");
const Submission = require("../schema/Submission");

//SALT & HASH Plugin
const bcrypt = require('bcryptjs');

//Set Session Variables
app.use(session({
    secret: 'some secret',
    cookie: {maxAge: 30000},
    saveUninitialized: false
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    console.log(store);
    console.log(`${req.method} - ${req.url}`);
    next();
})

//Routes
router.get('/quiz/selection', (req, res) => {
    Quiz.find({})
        .then((data) => {
            //console.log("Data: ", data);
            res.json(data);
        })
        .catch((error)=>{
            console.log("[Console]: ", error)
        })
});

router.get('/quiz/exam', (req, res) => {
    const quizID = req.query.id;
    Quiz.findById(quizID)
        .then((data) => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: 'Project not found' });
        }
        })
        .catch((error) => {
        res.status(500).json({ error: 'Internal Server Error!' });
        console.log('[Router]: ', error);
        });
    });

  /* This is the route to get the submissions */ 
  
router.get('/quiz/result', (req, res) => {
    const responseID = req.query.id;
    Submission.findById(responseID)
        .then((data) => {
            //console.log("Data: ", data);
            res.json(data);
        })
        .catch((error)=>{
            console.log("[Console]: ", error)
        })
});

router.post('/quiz/login', (req, res) => {
    //Prints out the incoming information
    console.log(`Session: ${req.sessionID}`);
    console.log('[Console]: Body-', req.body);
    data = req.body;

    User.findOne({email: `${data.email}`}, function (err, docs){
        if(err){
            res.json({
                msg: "[Console]: Error handling. Please try again later."
            });
            console.log(err);
        }else{
            const match = bcrypt.compareSync(data.password, docs.password.hash);
            //console.log(`Is match?: ${match}`);
            if(match){
                res.status(200).send(docs);

                //handle returning $_SESSION variables

                //This is supposed to redirect after the login is "complete".

            }else{
                //return invalid password
                res.status(500).send("[Console]: Hash not matched! Try Again!");
            }
            
        }
    });

    
});


router.post('/quiz/register', (req, res) => {
    console.log('[Console]: Body-', req.body);
    data = req.body;

    User.findOne({email: `${data.email}`}, function (err, docs){
        if(err){
            //res.send("[Console]: Error handling! Please try again later.");
            res.status(404).send("Error handling");
            console.log("[Console]: Error handling! Please try again later.", err);
        }else{
            //console.log("Queue: ", docs);
            if(docs == null){
                
                newUser = new User(data);
    
                newUser.save((error) => {
                    if (error){
                        res.json({
                            msg: "[Console]: Error handling. Please try again later."
                        });
                        console.log("[Console]: Error! ", err);
                    }else{
                        res.json({
                            msg: "[Console]: Registration information recieved!"
                        });
                        console.log("[Console]: User Successfully uploaded to database!");
                    }
                });
            }else{
                console.log("[Console]: Email already exists in database!");
                //Return output to DOM somewhere here
            }
            
        }
        
    });
});

//Route for uploading the quiz from the quiz-creator page
router.post('/quiz/exam/submit', (req, res) => {
    console.log('[Console]: Body-', req.body);
    data = req.body;

    const submission = new Submission(data);

    submission.save((error) => {
        if (error){
            res.json({
                msg: "[Console]: Error handling. Please try again later."
            });
            console.log("[Console]: Error! ", err);
        }else{
            console.log("[Console]: Quiz results successfully uploaded to database!");
            const objectId = submission._id;
            const redirectUrl = `/result?id=${objectId}`;

            res.json({
                msg: "[Console]: Registration information received!",
                redirectUrl: redirectUrl
            });
        }
    });
});

module.exports = router;