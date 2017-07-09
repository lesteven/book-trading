var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AllBooks = new Schema({
	books:{type:[]}
})

module.exports = mongoose.model('AllBooks',AllBooks)