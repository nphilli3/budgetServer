var Item = function(sequelize) {

	var handler = require('../library/handler')

	this.create = function(req, res, next) {
		sequelize.models.item.create(req.body).then(function(item) {
			req.payload.item = item
			next()
		}).catch(function(error){
			handler.badRequest(req,res,error.message)
		})
	}

	this.read = function(req, res, next) {
		sequelize.models.item.findById(req.params.id,req.payload.query).then(function(item) {
			if (!item) return handler.notFound(req, res, 'item not found.')
			req.payload.item = item
			next()
		})
	}

	this.update = function(req, res, next) {
		var payload = req.payload.item
		payload.update(req.body).then(function(updated){
			payload = updated
			next()
		}).catch(function(error){
			handler.badRequest(req,res,error.message)
		})
	}

	this.destroy = function(req, res, next) {
		req.payload.item.destroy().then(function(deleted){
			req.payload.item = {
				id: deleted.id,
				deleted: true
			}
			next()
		}).catch(function(error){
			handler.badRequest(req,res,error.message)
		})
	}

	this.list = function(req, res, next) {
		var query = req.payload.query
		sequelize.models.item.findAndCountAll(query).then(function(item) {
			req.payload.item = item
			next()
		})
	}

}

module.exports = function(sequelize) {
	return new Item(sequelize)
}
