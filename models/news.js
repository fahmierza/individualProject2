module.exports = (sequelize, Sequelize) => {
	const News2 = sequelize.define("news2", {
		judul: {
			type: Sequelize.TEXT
		},
		author: {
			type: Sequelize.TEXT
		},
		artikel: {
			type: Sequelize.TEXT
		}		
	});

	return News2;
};