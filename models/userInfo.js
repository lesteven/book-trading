var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserInfo = new Schema({
	_id:{type:String,required:true},
	info:{type:[]},
	books:{type:[]},
	orequest:{type:[]},
	yrequest:{type:[]}
},{
	_id:false
})	

module.exports = mongoose.model('UserInfo',UserInfo)