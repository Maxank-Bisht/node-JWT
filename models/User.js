const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Please Enter An Email'],
		unique: true,
		lowercase: true,
		validate: [isEmail, 'Please Enter A Valid Email'],
	},
	password: {
		type: String,
		required: [true, 'Please enter a password'],
		minlength: [6, 'Minimun password length is 6 character'],
	},
});

const User = mongoose.model('user', userSchema);

module.exports = User;
