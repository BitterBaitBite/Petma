const { Sequelize } = require('sequelize');

const sequelize = require('../db');

const Pet = sequelize.define(
	'pet',
	{
		name: {
			field: 'name',
			type: Sequelize.TEXT,
			allowNull: false,
		},

		description: {
			field: 'name',
			type: Sequelize.TEXT,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
);

module.exports = Pet;
