const Sequelize = require('sequelize');

const PGDATABASE_URI = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const sequelize = new Sequelize(PGDATABASE_URI);

sequelize
	.authenticate()
	.then(() => console.log('Connection to the database has been established successfully.'))
	.catch(error => console.error('Unable to connect to the database:', error));

module.exports = sequelize;
