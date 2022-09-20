const { Sequelize } = require('sequelize');

const sequelize = require('../db');
const Friendship = require('./friendship.model');
const Pet = require('./pet.model');

const User = sequelize.define(
	'user',
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

User.hasMany(Pet);
Pet.belongsTo(User, { foreignKey: 'owner_id' });

User.belongsToMany(User, { through: Friendship, as: 'parents', foreignKey: 'user1_id' });
User.belongsToMany(User, { through: Friendship, as: 'children', foreignKey: 'user2_id' });

module.exports = User;
