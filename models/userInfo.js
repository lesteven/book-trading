var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Info = new Schema({
	first:String,
	middle:String,
	last:String,
	city:String,
	state:String
})
var Books = new Schema({
	title:String,
	thumbnail:String
})
var Request = new Schema({
	_id:{type:String,required:true},
	title: String,
	user: String,
	owner:String
},{
	_id:false
})
var UserInfo = new Schema({
	_id:{type:String,required:true},
	info:{type:[Info]},
	books:{type:[Books]},
	orequest:{type:[Request]},
	yrequest:{type:[Request]},
	accepted:{type:[]}
},{
	_id:false
})	

module.exports = mongoose.model('UserInfo',UserInfo)