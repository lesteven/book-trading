var express = require('express');
var requestRouter = express.Router();
var UserInfo = require('../models/userInfo');
var AllBooks = require('../models/allBooks');


requestRouter.route('/')

.post(function(req,res){
	addRequestToBook(req,res)
})
function addRequestToBook(req,res){
	AllBooks.findById({_id:'all'},function(err,data){
		var book = data.books.id(req.body._id)
		book.requests.push(req.user.username)
		data.markModified('books')
		data.save();
		res.json(data);
		var request ={
			title:book.title,
			user: req.user.username,
			owner : book.owner
		}
		console.log(book.owner,book.title)
		sendRequestToUser(req,res,request)
	})
}
function sendRequestToUser(req,res,request){
	UserInfo.findById({_id:request.owner},function(err,data){
		data.orequest.push(request)
		data.markModified('orequest');
		data.save()
		console.log(data.orequest)
	})
	
	UserInfo.findById({_id:req.user.username},function(err,data){
		data.yrequest.push(request)
		data.markModified('yrequest');
		data.save()
		console.log(data.yrequest)
	})
}
module.exports = requestRouter;