var express = require('express');
var infoRouter = express.Router();
var UserInfo = require('../models/userInfo');
var AllBooks = require('../models/allBooks');
var axios =require('axios');


infoRouter.route('/')

.get(function(req,res){
	getUserInfo(req,res)
})

.post(function(req,res){
	postUserInfo(req,res)
})

infoRouter.route('/myBooks')

.post(function(req,res){
	searchBookAPI(req,res)
})

function getUserInfo(req,res){
	UserInfo.findById({_id:req.user.username},function(err,info){
		//console.log(req.user.username)
		if(err){
			console.log(err)
		}
		else if(!info){
			var data ={
				_id: req.user.username,
				info:[{
					first:'',
					middle:'',
					last:'',
					city:'',
					state:''
				}]
			}
			console.log(data)
			UserInfo.create(data,function(err,info){
				if(err) throw err;
				console.log('will create')
				res.json(info)
			})
		}
		else{
			console.log('created already')
			res.json(info)
		}
	})
}
function postUserInfo(req,res){
	UserInfo.findById({_id:req.user.username},function(err,data){
		if(err) throw err;
		var keys = Object.keys(req.body)

		for(var i = 0; i < keys.length; i++){
			//console.log(data.info[0][keys[i]],req.body[keys[i]],keys[i]);
			data.info[0][keys[i]] = req.body[keys[i]] || data.info[0][keys[i]]
		}
		data.markModified('info');
		data.save();
		res.json(data)
	})
}
function searchBookAPI(req,res){
	var url ='https://www.googleapis.com/books/v1/volumes?q='
	url += req.body.query
	console.log(url)
	axios.get(url)
	.then(response=>{
		var title = response.data.items[0].volumeInfo.title
		var thumbnail = (response.data.items[0].volumeInfo.imageLinks?
			response.data.items[0].volumeInfo.imageLinks.smallThumbnail:
		 'https://books.google.com/books/content?id=1&printsec=frontcover&img=1&zoom=1')
		var bookData ={
			title:title,
			thumbnail:thumbnail
		}
		//console.log(data)
		postBookInfo(req,res,bookData)
		//postAllBook(req,res,bookData)
	})
	.catch(error=>{
		console.log(error)
	})
}
function postBookInfo(req,res,bookData){
	//console.log(req.user.username)
	UserInfo.findById({_id:req.user.username},function(err,data){
		if(err){
			console.log(err)
		}
		data.books.push(bookData)
		console.log(bookData)
		data.markModified('books');
		data.save();
		res.json(data)
	})
}
function postAllBook(req,res,bookData){
	AllBooks.findById({_id:'all'},function(err,data){
		if(err){
			console.log(err)
		}
		if(!data){
			AllBooks.create({_id:'all'},function(err,books){
				if(err) throw err;
				console.log(books)
			})
		}
		else{
			bookData.owner = req.user.username
			data.books.push(bookData);
			data.markModified('books')
			data.save();
		}		
		console.log(data)
	})
}
module.exports = infoRouter;