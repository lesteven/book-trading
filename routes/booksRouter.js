var express = require('express');
var booksRouter = express.Router();

booksRouter.route('/')

.get(function(req,res){
	res.json({status:'success'})
})

module.exports = booksRouter;