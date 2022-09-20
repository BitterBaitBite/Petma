const router = require('express').Router();

const sequelize = require('../db');

/**
 * Fetch all users from de DDBB
 */
router.get('/', (req, res, next) => {
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

			next(err);
		});
});

/**
 * Fetch one user with all it's pets and friends by it's id (primary key)
 */
router.get('/:id', (req, res, next) => {
	const { id } = req.params;

	sequelize
		.query(
			'(SELECT u.name, u.description FROM users u		\
			WHERE u.id=(:id)) 														\
			UNION ALL 																		\
			(SELECT u2.name, u2.description FROM users u 	\
			JOIN friendships f ON f.user1_id=u.id 				\
			JOIN users u2 ON u2.id=f.user2_id 						\
			WHERE u.id=(:id)) 														\
			UNION ALL 																		\
			(SELECT u2.name, u2.description FROM users u 	\
			JOIN friendships f ON f.user2_id=u.id 				\
			JOIN users u2 ON u2.id=f.user1_id 						\
			WHERE u.id=(:id)) 														\
			UNION ALL 																		\
			(SELECT p.name, p.description FROM pets p 		\
			INNER JOIN users u ON u.id=p.owner_id 				\
			WHERE p.owner_id=(:id))',
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

			next(err);
		});
});

/**
 * Fetch one user by it's id (Currently not being used)
 */
router.get('/:id/user', (req, res, next) => {
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

			next(err);
		});
});

/**
 * Fetch the pets for the user by it's id (Currently not being used)
 */
router.get('/:id/pets', (req, res, next) => {
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

			next(err);
		});
});

/**
 * Fetch the friends for the user by it's id (Currently not being used)
 */
router.get('/:id/friends', (req, res, next) => {
	const { id } = req.params;

	sequelize
		.query(
			'(SELECT u2.name, u2.description FROM users u \
			JOIN friendships f ON f.user1_id=u.id 				\
			JOIN users u2 ON u2.id=f.user2_id 						\
			WHERE u.id=(:id)) 														\
			UNION ALL 																		\
			(SELECT u2.name, u2.description FROM users u 	\
			JOIN friendships f ON f.user2_id=u.id 				\
			JOIN users u2 ON u2.id=f.user1_id 						\
			WHERE u.id=(:id))',
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

			next(err);
		});
});

/**
 * User direct creation (User creation should be auth/signup controlled in the future)
 */
router.post('/', (req, res, next) => {
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

			next(err);
		});
});

/**
 * Update a user selected by id with the request body data
 */
router.put('/:id', (req, res, next) => {
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

			next(err);
		});
});

/**
 * Delete a user from the table by id
 */
router.delete('/:id', (req, res, next) => {
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
