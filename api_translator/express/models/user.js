const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "fullname not provided "],
    },
    email: {
        type: String,
        unique: [true, "emailail already exists in database!"],
        lowercase: true,
        trim: true,
        required: [true, "email not provided"],
        validate: {
          validator: function (v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          },
          message: '{VALUE} is not a valid email!'
        }
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.searchUsers = function(keyword){
    return this.find({
        $or: [{
            'name': { $regex: '(?:'+keyword+')'}
        },{
            'email': { $regex: '(?:'+keyword+')'}
        }]
    })
}
userSchema.statics.getSummaryNotis = function(userId, callback){
    return mongoose.model('Noti').find({
        'receiver': mongoose.Types.ObjectId(userId), 
        'isRead': false 
    }).exec(function(err, docs){
        console.log(docs);
        callback(err, docs)
    })
    // return mongoose.model('Noti').aggregate([
    //     { "$match": { 'receiver': mongoose.Types.ObjectId(userId), 'isRead': false  }},
    //     { '$group': { _id: '$referenceType', 'count': {'$count':{}}}},
    // ]).exec(function(err, docs){
    //     callback(err, docs)
    // })
}
userSchema.statics.getNotis = function(userId){
    return mongoose.model('Noti').find({'receiver':userId}).populate("sender", "name email")
}
userSchema.statics.getInvites = function(userId){
    return mongoose.model('Invite').find({'invitee':userId}).populate("novel")
}
userSchema.statics.getQuestions = function(userId, callback){
    return mongoose.model('Question')
        .find({'questioner':userId})
        .populate('chapter')
        .exec(function(err, docs){
            if(err) return callback(err)
            const filteredDocs = docs.map(item => {
                if(item.chapters.length === 0){
                    console.log(item);
                    console.log({...item});
                    return {
                        ...item, 
                        chapter: {
                            ...item.chapter, 
                            sentences: item.chapter.sentences.filter(
                                sentence=>item.sentences.indexOf(sentence._id) > -1
                            )
                        }
                    }
                }
                else return item
            })
            callback(err, filteredDocs)
        })
}

module.exports = mongoose.model('User', userSchema);
