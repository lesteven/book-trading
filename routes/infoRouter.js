var express = require('express');
var infoRouter = express.Router();
var UserInfo = require('../models/userInfo');

infoRouter.route('/')

.get(function(req,res){
	getUserInfo(req,res)
})

.post(function(req,res){
	postUserInfo(req,res)
})
.put(function(req,res){

})

function getUserInfo(req,res){
	UserInfo.findById({_id:req.user.username},function(err,info){
		//console.log(req.user.username)
		if(err){
			console.log(err)
		}
		else if(!info){
			var data ={
				_id: req.user.username
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
	if(req.body.first){
		console.log(req.body.first)
		UserInfo.findById({_id:req.user.username},function(err,info){

		})
	}
	else{
		console.log(req.body.city)
		UserInfo.findById({_id:req.user.username},function(err,info){
			
		})
	}
}
module.exports = infoRouter;