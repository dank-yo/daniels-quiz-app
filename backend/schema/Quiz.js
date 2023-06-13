/* Quiz.js
 * This page is responsible for creating the mongoose Quiz schema model'
 * connects to the table `quizs`
 * 
 * Daniel
 */

var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: Number
});

var quizSchema = new mongoose.Schema({
  creator: String,
  title: String,
  tags: [String],
  date: Date,
  questions: [questionSchema]
});


module.exports = mongoose.model('quizzes', quizSchema);
