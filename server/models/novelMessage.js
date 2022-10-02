const mongoose = require('mongoose');
// const Schema = require('schema')

const novelSchema = new mongoose.Schema({
	title: String,
	description: String,
	mm_name: String,
	genres: [String],
	cover: String,
	createdAt: {
		type: Date,
		default: new Date()
	},
	lastEditedAt: {
		type: Date,
		default: new Date()
	}
})

const NovelMessage = mongoose.model('NovelMessage', novelSchema)

module.exports = NovelMessage