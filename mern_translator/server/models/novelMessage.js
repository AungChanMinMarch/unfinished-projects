import mongoose from 'mongoose';

const novelSchema = mongoose.Schema({
    title: String,
    description: String,
    creater: String,
    moderators: { type: [String], default: [] },
    mm_name: String,
    author: String,
    genres: [String],
    cover_photo: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    lastEditedAt: {
        type: Date,
        default: new Date(),
    },
})

var NovelMessage = mongoose.model('NovelMessage', novelSchema);

export default NovelMessage;