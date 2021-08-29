const User = require('../models/User');

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
		res.status(201).json(user);
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