const { Sequelize } = require('sequelize');

const sequelize = require('../db');
const User = require('./user.model');

const Friendship = sequelize.define(
	'friendship',
	{
		user1_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
		},
		user2_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
		},
	},
	{
		timestamps: false,
	}
);

module.exports = Friendship;
