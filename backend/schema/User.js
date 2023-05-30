/* User.js
 * This page is responsible for creating the mongoose User schema model'
 * connects to the table `users`
 * 
 * Daniel
 */

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    'username': String,
	'password': {
		hash: String,
		salt: String
	},
    name:{
		firstname: String,
		lastname: String,
	},
    'email': String,
    'role': String,
	'created' : Date,
    'lastlogin' : Date
})

module.exports = mongoose.model('users', userSchema);
