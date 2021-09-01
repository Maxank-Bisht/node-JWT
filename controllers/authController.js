require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const jwt_secret = process.env.JWT_SECRET;

//error handler
const handleErrors = (err) => {
	let errors = { email: '', password: '' };

	//duplicate email
	if (err.code === 11000) {
		errors.email = 'This email is already registered';
		return errors;
	}

	//validation errors
	if (err.message.includes('user validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}
	return errors;
};

const maxAge = 3 * 24 * 60 * 60;
//creating web tokens
const createToken = (id) => {
	return jwt.sign({ id }, jwt_secret, {
		expiresIn: maxAge,
	});
};

module.exports.signup_get = (req, res) => {
	res.render('signup');
};
module.exports.login_get = (req, res) => {
	res.render('login');
};
module.exports.signup_post = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.create({ email, password });
		const token = createToken(user._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(201).json({ user: user._id });
	} catch (error) {
		const errors = handleErrors(error);
		res.status(400).json({ errors });
	}
};
module.exports.login_post = (req, res) => {
	const { email, password } = req.body;
	console.log(email, password);
	res.send('new login');
};
