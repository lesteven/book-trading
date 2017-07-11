var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Books = new Schema({
	title:String,
	thumbnail:String,
	owner:String,
	requests:[]
})
var AllBooks = new Schema({
	_id:{type:String,required:true},
	books:{type:[Books]}
},{
	_id:false
})

module.exports = mongoose.model('AllBooks',AllBooks)