// create mongoose model; monogo automatically generates _id
var mongoose = require('mongoose');

module.exports = mongoose.model('Post', {
	text : String,
	// done : Boolean,
	amount: Number,
	date: Date,
	total: Number
});