const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// currently there is only editor or admin. other roles will be added soon
const inviteSchema = new Schema({
    novel: {
        type: Schema.Types.ObjectId,
        ref: "Novel",
        required: true
    },
    invitee: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    state:{
        type: String,
        default: 'requested',
        enum: ['requested', 'accepted', 'rejected']
    },
    createdAt: {
        type:Date,
        default: new Date(Date.now())
    }
})

inviteSchema.statics.uniqueSave = function(newInviteObj, callback){
    // const Invite = this;
    return this.find(newInviteObj, function(err, docs){
        console.log('invite', docs);
        if(err){
            return callback(err, null);
        }
        else if(docs.length === 0){
            const newInvite = new mongoose.model('Invite')(newInviteObj);
            newInvite.save(callback)
        }else if(docs.length=== 1){
            if(docs[0].state === 'requested')
                callback('you have already invited', null);
            else if(docs[0].state === 'accepted')
                callback('The user has been EDITOR', null);
        }
    })
}
// admin can add or remove admins. admin can also do whatever editor can do
// editor can add or delete chapters. editor can also do whatever contributor can do
// contributor can edit chapter. (they can't add or delete chapter)

module.exports = mongoose.model("Invite", inviteSchema)