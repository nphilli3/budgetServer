module.exports = function(sequelize){

	var express = require('express');
	var router = require('express').Router()
	var item = require('../middlewares/item')(sequelize)

	// router.use('/:id', item.read)
	router.post('/', item.create)
	router.get('/', item.list)
	router.get('/:id', item.read)
	router.put('/:id', item.update)
	router.delete('/:id', item.destroy)

	//Create
	router.post('/',function(req,res){
		res.json(req.payload.item)
	})

	//List
	router.get('/', function(req, res) {
	  var payload = req.payload.item
	  payload.limit = req.payload.query.limit
	  payload.offset = req.payload.query.offset
	  res.json(req.payload.item)

	});
	//Read
	router.get('/:id', function(req, res) {
	  res.json(req.payload.item)
	})

	//Update
	router.put('/:id', function(req, res){
	  res.json(req.payload.item)
	})

	//Destroy
	router.delete('/:id',function(req,res){
	  res.json(req.payload.item)
	})

	return router
}
