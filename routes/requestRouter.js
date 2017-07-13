var express = require('express');
var requestRouter = express.Router();
var UserInfo = require('../models/userInfo');
var AllBooks = require('../models/allBooks');
var mongoose = require('mongoose');

requestRouter.route('/')

.post(function(req,res){
	addRequestToBook(req,res)
})

requestRouter.route('/approve')

.post(function(req,res){
	console.log('approve',req.body)
	removeFromRequest(req,res)
	acceptTrade(req,res)
})

requestRouter.route('/decline')

.post(function(req,res){
	console.log('decline',req.body)
})

function addRequestToBook(req,res){
	AllBooks.findById({_id:'all'},function(err,data){
		var book = data.books.id(req.body._id)
		book.requests.push(req.user.username)
		data.markModified('books')
		data.save();
		res.json(data);
		var id = mongoose.Types.ObjectId();
		var request ={
			_id:id,
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
function acceptTrade(req,res){
	UserInfo.findById({_id:req.body.user},function(err,data){
		var book = {
			title:req.body.title,
			user:req.user.username
		}
		data.accepted.push(book)

		data.yrequest.id(req.body.id).remove()
		data.markModified('accepted');
		data.markModified('yrequest')
		console.log(data.accepted,data.yrequest)
		data.save()
	})
}
function declineTrade(req,res){

}
function removeFromRequest(req,res){
	UserInfo.findById({_id:req.user.username},function(err,data){
		data.orequest.id(req.body.id).remove()
		data.markModified('orequest');
		data.save()
		res.json(data)
		console.log(data.orequest)
	})
}
module.exports = requestRouter;