var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AllBooks = new Schema({
	books:{[
		{
			title:String,
			owner:String,
			requests:[]
		}
	]}
})

module.exports = mongoose.model('AllBooks',AllBooks)