const router = require('express').Router();

const sequelize = require('../db');
const User = require('../models/User.model');
const Friendship = require('../models/Friendship.model');

/**
 * Fetch all users from de DDBB
 */
router.get('/', (req, res) => {
	// Sequelize ORM option: User.findAll()
	sequelize
		.query('SELECT * FROM users ORDER BY id')
		.then(([users]) => {
			if (!users || users.length === 0) {
				res.status(404).json(null);
			}

			res.status(200).json(users);
		})
		.catch(err => {
			console.error(err);

			res.status(500).json(err);
		});
});

/**
 * Fetch one user by it's id (primary key)
 */
router.get('/:id', (req, res) => {
	const { id } = req.params;

	sequelize
		.query(`SELECT * FROM users WHERE users.id IN (:id)`, {
			replacements: { id: [id] },
		})
		.then(([user]) => {
			if (!user) {
				res.status(404).json(null);
			}

			res.status(200).json(user);
		})
		.catch(err => {
			console.error(err);

			res.status(500).json(err);
		});
});

/**
 * Fetch the pets for the user by it's id (primary key)
 */
router.get('/:id/pets', (req, res) => {
	const { id } = req.params;

	sequelize
		.query(
			'SELECT pets.name, pets.description FROM users \
					INNER JOIN pets ON users.id=pets.owner_id \
					WHERE users.id IN (:id)',
			{
				replacements: { id: [id] },
			}
		)
		.then(([user]) => {
			if (!user) {
				res.status(404).json(null);
			}

			res.status(200).json(user);
		})
		.catch(err => {
			console.error(err);

			res.status(500).json(err);
		});
});

/**
 * Fetch the friends for the user by it's id
 */
router.get('/:id/friends', (req, res) => {
	const { id } = req.params;

	sequelize
		.query(
			'SELECT u1.name, u1.description FROM friendships f \
				INNER JOIN users u1 ON u1.id=f.user1_id \
				INNER JOIN users u2 ON u2.id=f.user2_id \
				WHERE f.user1_id IN (:id) \
				OR f.user2_id IN (:id)',
			{
				replacements: { id: [id] },
			}
		)
		.then(([user]) => {
			if (!user) {
				res.status(404).json(null);
			}

			res.status(200).json(user);
		})
		.catch(err => {
			console.error(err);

			res.status(500).json(err);
		});
});

/**
 * User direct creation (temp.just for developing)
 */
router.post('/', (req, res) => {
	const { name, description } = req.body;

	if (!name) {
		res.status(204).json(null);
	}

	// Sequelize ORM option: User.create({ name, description })
	sequelize
		.query('INSERT INTO users (name, description) VALUES ((:name), (:description))', {
			replacements: { name, description },
		})
		.then(() => {
			res.status(201).json();
		})
		.catch(err => {
			console.error(err);

			res.status(500).json(err);
		});
});

/**
 * Update a selected by id user
 */
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { name, description } = req.body;

	// One Sequelize ORM option (from multiple options): User.update({ name, description }, { where: { id }, returning: true })
	sequelize
		.query('UPDATE users SET name=(:name), description=(:description) WHERE id=(:id)', {
			replacements: { name, description, id },
		})
		.then(() => {
			res.status(201).json();
		})
		.catch(err => {
			console.error(err);

			res.status(500).json(err);
		});
});

/**
 * Delete a user from the table by id
 */
router.delete('/:id', (req, res) => {
	const { id } = req.params;

	// Sequelize ORM option: User.destroy({ where: { id } })
	sequelize
		.query('DELETE FROM users WHERE id=(:id)', { replacements: { id } })
		.then(() => {
			res.status(200).json();
		})
		.catch(err => {
			console.error(err);

			res.status(500).json(err);
		});
});

module.exports = router;
