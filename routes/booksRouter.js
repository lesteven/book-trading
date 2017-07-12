var express = require('express');
var booksRouter = express.Router();
var AllBooks = require('../models/allBooks');


booksRouter.route('/')

.get(function(req,res){
	getBookInfo(req,res)
})

function getBookInfo(req,res){
	AllBooks.findById({_id:'all'},function(err,data){
		if(err){
			console.log(err)
		}
		if(!data){
			AllBooks.create({_id:'all',books:[]},function(err,books){
				if(err) throw err;
				console.log('will create',books)
				res.json(books)
			})
		}
		else{
			console.log('already created')
			res.json(data)
		}
	})
}
module.exports = booksRouter;