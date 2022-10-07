const { Sequelize, DataTypes } = require('sequelize');

// sql server
const sequelize = new Sequelize('NodeDB', 'test1', '1234', {
	dialect: 'mssql',
	//host: "192.168.xx",
	dialectOptions: {
	  // Observe the need for this nested `options` field for MSSQL
	  options: {
		// Your tedious options here
		useUTC: false,
		dateFirst: 1,
	  },
	},
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.newss2 = require('./news')(sequelize, Sequelize);
db.comments2 = require('./comment')(sequelize, Sequelize);

db.newss2.hasMany(db.comments2, {as: "comments"})
db.comments2.belongsTo(db.newss2,{foreignKey:'idnews'});

module.exports = db;