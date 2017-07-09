var express = require('express');
var infoRouter = express.Router();
var UserInfo = require('../models/userInfo');

infoRouter.route('/')

.get(function(req,res){
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
})
.post(function(req,res){

})
.put(function(req,res){

})

module.exports = infoRouter;