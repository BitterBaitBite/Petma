const router = require('express').Router();

const sequelize = require('../db');
const Pet = require('../models/pet.model');

router.get('/', (req, res, next) => {
	// Pet.findAll()
	sequelize
		.query('SELECT * FROM pets')
		.then(([pets]) => {
			if (!pets || pets.length === 0) {
				res.status(204).json();
			}

			res.status(200).json(pets);
		})
		.catch(err => {
			console.error(err);

			next(err);
		});
});

router.get('/:id', (req, res, next) => {
	const { id } = req.params;

	// Pet.findByPk(id)
	sequelize
		.query('SELECT * FROM pets WHERE id=(:id)', { replacements: { id: [id] } })
		.then(pet => {
			if (!pet) {
				res.status(204).json();
			}

			res.status(200).json(pet);
		})
		.catch(err => {
			console.error(err);

			next(err);
		});
});

router.get('/:owner_id', (req, res, next) => {
	const { owner_id } = req.params;

	// Pet.findAll({ where: { owner_id: owner_id } })
	sequelize
		.query('SELECT * FROM pets WHERE owner_id=(:owner_id)', { replacements: { owner_id: [owner_id] } })
		.then(results => {
			const pets = results[0];

			if (!pets || pets.length === 0) {
				res.status(204).json();
			}

			res.status(200).json(pets);
		})
		.catch(err => {
			console.error(err);

			next(err);
		});
});

module.exports = router;
