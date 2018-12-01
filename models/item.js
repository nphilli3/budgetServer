var Sequelize = require('sequelize')


module.exports = function(sequelize) {

	var Item = sequelize.define('item', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		itemName: {
			type: Sequelize.TEXT
		},
		itemCost: {
			type: Sequelize.INTEGER
		},
	}, {
		timestamps: true,
	})

	return Item

}
