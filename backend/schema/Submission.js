/* Response.js
 * This page is responsible for creating the mongoose Reponse schema model
 * connects to the table `quizs_response`
 * 
 * Daniel
 */

const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    'quizid': Object,
    'username': String,
    'useremail': String,
    'userID' : Object,
    'answers' : {},
    'correct' : Number,
    'incorrect' : Number,
    'percentage' : Number,
    'date': Date
})

module.exports = mongoose.model('submissions', submissionSchema);