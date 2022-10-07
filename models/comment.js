module.exports = (sequelize, Sequelize) => {
	const Comment3 = sequelize.define("comment3", {
		idnews: {
			type: Sequelize.INTEGER
		},
		nama: {
			type: Sequelize.STRING
		},
		komentar: {
			type: Sequelize.TEXT
		}		
	});

	return Comment3;
};