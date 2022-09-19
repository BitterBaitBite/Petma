const router = require('express').Router();

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const User = require('./../models/User.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

/** User register/creation */
router.post('/signup', (req, res) => {
	const { username, password } = req.body;

	if (username.length <= 0 || username.match(/^\s*$/)) {
		res.status(400).json({ code: 400, message: 'Username cannot be empty' });
		return;
	}

	if (password.length <= 0 || password.match(/^\s*$/)) {
		res.status(400).json({ code: 400, message: 'Password cannot be empty' });
		return;
	}

	User.findOne({ username })
		.then(user => {
			if (user) {
				res.status(400).json({ code: 400, message: 'Username already exists' });
				return;
			}

			const salt = bcrypt.genSaltSync(bcryptSalt);
			const hashPass = bcrypt.hashSync(password, salt);

			User.create({ username, password: hashPass, fav_restaurants: [] })
				.then(user => {
					const { _id: id, username } = user;

					res.status(201).json({ id, username });
				})
				.catch(err => res.status(500).json({ code: 500, message: 'DB error while creating user', err }));
		})
		.catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user', err }));
});

/** User login */
router.post('/login', (req, res) => {
	const { username, password } = req.body;

	if (username.length <= 0 || username.match(/^\s*$/)) {
		res.status(400).json({ code: 400, message: 'Username cannot be empty' });
		return;
	}

	if (password.length <= 0 || password.match(/^\s*$/)) {
		res.status(400).json({ code: 400, message: 'Password cannot be empty' });
		return;
	}

	User.findOne({ username })
		.then(user => {
			if (!user) {
				res.status(401).json({ code: 401, message: 'Username not found' });
				return;
			}

			if (!bcrypt.compareSync(password, user.password)) {
				res.status(401).json({ code: 401, message: 'Wrong password' });
				return;
			}

			const { _id: id, username, fav_restaurants_id } = user;

			const payload = { id, username };

			const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
				algorithm: 'HS256',
				expiresIn: '6h',
			});

			res.status(200).json({ authToken });
		})
		.catch(err => res.status(500).json({ code: 500, message: 'DDBB error while fetching user', err }));
});

/** Gets session token payload with the user information, only if user is logged in */
router.get('/verify', isAuthenticated, (req, res) => {
	console.log(`Payload: ${req.payload}`);

	res.status(200).json(req.payload);
});

/** User logout endpoint */
router.get('/logout', (req, res) => {
	req.session.destroy(
		err =>
			(!err && res.json({ message: 'Logout successful' })) ||
			res.status(500).json({ code: 500, message: 'Error on destroying session', err })
	);
});

module.exports = router;
