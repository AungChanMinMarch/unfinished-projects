const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
	name: String,
	index: Number,
	novel: {
		type: Schema.Types.ObjectId, 
		ref: "Novel",
		required: true
	}
},{
	toJSON: {virtuals: true},
	toObject: {virtuals: true}
})
chapterSchema.virtual("sentences", {
	ref: "Sentence",
	localField: "_id",
	foreignField: "chapterId"
})
chapterSchema.statics.getChapter = function(chapterId, callback){
	// return mongoose.model("Sentence").find({}, function(err, docs){
	// 	console.log(docs);
	// })
	return this.findById(chapterId).populate("sentences").exec(function(err, docs){
		console.log(docs);
		callback(err, docs)
	})
}
module.exports = mongoose.model("Chapter", chapterSchema)