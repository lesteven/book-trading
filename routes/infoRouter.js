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

.delete(function(req,res){
	deleteMyBook(req,res)
	deleteFromTotal(req,res)
})
//user info functions
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
			//console.log(data)
			UserInfo.create(data,function(err,info){
				if(err) throw err;
				//console.log('will create')
				res.json(info)
			})
		}
		else{
			//console.log('created already')
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
//get book API
function searchBookAPI(req,res){
	var url ='https://www.googleapis.com/books/v1/volumes?q='
	url += req.body.query
	//console.log(url)
	axios.get(url)
	.then(response=>{
		var title = response.data.items[0].volumeInfo.title
		var thumbnail = (response.data.items[0].volumeInfo.imageLinks?
			response.data.items[0].volumeInfo.imageLinks.smallThumbnail:
		 'http://books.google.com/books/content?id=1&printsec=frontcover&img=1&zoom=1')
		var URL = url.replace(/^http/,'https')
		var bookData ={
			title:title,
			thumbnail:URL
		}
		//console.log(data)
		postBookInfo(req,res,bookData)
		//postAllBook(req,res,bookData)
	})
	.catch(error=>{
		console.log(error)
	})
}

//post functions
function postAllBook(req,res,bookData,id){
	//console.log(bookData)
	AllBooks.findById({_id:'all'},function(err,data){
		if(err){
			console.log(err)
		}
		else{
			bookData._id = id;
			bookData.owner = req.user.username
			var index = data.books.push(bookData);
			//console.log(data.books[index-1]._id)
			data.markModified('books')
			data.save();
		}		
		//console.log('all',data)
	})
}
function postBookInfo(req,res,bookData){
	//console.log(req.user.username)
	UserInfo.findById({_id:req.user.username},function(err,data){
		if(err){
			console.log(err)
		}
		var index = data.books.push(bookData)
		var id = data.books[index-1]._id
		//console.log(id)
		data.markModified('books');
		data.save();
		postAllBook(req,res,bookData,id)
		res.json(data)

	})
}

//delete functions
function deleteMyBook(req,res){
	UserInfo.findById({_id:req.user.username},function(err,data){
		//var index = data.books.indexOf(req.body.title)
		//console.log(req.body.index)
		data.books.splice(req.body.index,1)
		data.markModified('books')
		data.save()
		res.json(data)
	})
}
function deleteFromTotal(req,res){
	//console.log(req.body._id)
	AllBooks.findOneAndUpdate({'books_id':req.body_id},
		{
			$pull: {books:{_id:req.body._id}}
		},
		{new: true},
		function(err,data){
		//console.log(data)
	})
}
module.exports = infoRouter;