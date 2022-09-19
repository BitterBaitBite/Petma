const router = require('express').Router();

const sequelize = require('../db');
const Pet = require('../models/Pet.model');

router.get('/', (req, res) => {
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

			res.status(500).json(err);
		});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;

	// Pet.findByPk(id)
	sequelize
		.query('SELECT * FROM pets WHERE id=(:id)', { replacements: { id: [id] } })
		.then(pet => {
			console.log(pet);

			if (!pet) {
				res.status(204).json();
			}

			res.status(200).json(pet);
		})
		.catch(err => {
			console.error(err);

			res.status(500).json(err);
		});
});

router.get('/:owner_id', (req, res) => {
	const { owner_id } = req.params;
	console.log('---------------------------------------------------');

	// Pet.findAll({ where: { owner_id: owner_id } })
	sequelize
		.query('SELECT * FROM pets WHERE owner_id=(:owner_id)', { replacements: { owner_id: [owner_id] } })
		.then(results => {
			const pets = results[0];

			console.log('result', results, 'pets', pets);

			if (!pets || pets.length === 0) {
				res.status(204).json();
			}

			res.status(200).json(pets);
		})
		.catch(err => {
			console.error(err);

			res.status(500).json(err);
		});
});

module.exports = router;
