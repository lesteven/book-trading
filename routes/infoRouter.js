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
		/*
		if(!data.info[0]){
			data.info[0] ={};
		}*/
		if(req.body.first || req.body.middle || req.body.last){
			data.info[0].first = req.body.first || data.info[0].first 
			data.info[0].middle = req.body.middle || data.info[0].middle 
			data.info[0].last = req.body.last || data.info[0].last 
		}
		else{
			data.info[0].city = req.body.city || data.info[0].city 
			data.info[0].state = req.body.state || data.info[0].state 
		}
		data.markModified('info');
		data.save();
		res.json(data)
	})
}
module.exports = infoRouter;