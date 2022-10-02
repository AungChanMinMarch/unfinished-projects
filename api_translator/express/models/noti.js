const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const notiSchema = new Schema({
	sender: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  receiver: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
  reference: {
    type: Schema.Types.ObjectId,
    refPath: 'referenceType'
  },
  referenceType: {
    type: String,
    required: true,
    enum: ['Invite', 'Question']//question, edited
  },
  message: String,
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type:Date,
    default: new Date(Date.now())
  }
})

module.exports = mongoose.model("Noti", notiSchema)