const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const sentenceSchema = new Schema({
	chapterId: {
		type: Schema.Types.ObjectId,
		ref: "Chapter"
	},
	engSentence: String,
	memory: String,
	mmSentence: String
})

module.exports = mongoose.model("Sentence" , sentenceSchema)