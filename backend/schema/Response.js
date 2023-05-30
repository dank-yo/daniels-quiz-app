/* Response.js
 * This page is responsible for creating the mongoose Reponse schema model
 * connects to the table `quizs_response`
 * 
 * Daniel
 */

const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    'quiz_id': String,
    'username': String,
    'useremail': String,
    'userID' : String,
    'answers' : {},
    'date': Date, 
    'correct' : Number,
    'incorrect' : Number,
    'percentage' : Number
})

module.exports = mongoose.model('quizs_responses', responseSchema);