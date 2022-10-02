const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const questionSchema = new Schema({
	questioner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    respondents:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    chapters: [{
        type: Schema.Types.ObjectId,
        ref: 'Chapter'
    }],
    chapter: {
        type: Schema.Types.ObjectId,
        ref: 'Chapter'
    },
    sentences: [String],
    question: String,
    createdAt: {
        type:Date,
        default: new Date(Date.now())
    }
})

module.exports = mongoose.model("Question", questionSchema)