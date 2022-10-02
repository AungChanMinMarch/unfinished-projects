const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const wordSchema = new Schema({
	engWord: String,
	public: [{
		category: String,
		mmWord: String,
		creator:{
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		novel: { //this is not array because I don't want to change meaning in another novel when user update meaning in one novel, 
			type: Schema.Types.ObjectId,
			ref: 'Novel'
		}
	}]
})

module.exports = mongoose.model("Word", wordSchema)