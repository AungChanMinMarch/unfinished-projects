const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const novelSchema = new Schema({
	name: {
	    type: String,
	    required: true,
	},
	mmName: String,
	author: String,
	translator: String,
	admin: {
		type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    editors: [{
    	type: Schema.Types.ObjectId,
        ref: "User"
    }],
},{
	toJSON: {virtuals: true},
	toObject: {virtuals: true}
})

novelSchema.virtual('chapters', {
	ref: 'Chapter',
	localField: '_id',
	foreignField: 'novel'
})

novelSchema.statics.getNovels = function(userId, callback){
    return this.find({ '$or': [{
        admin: mongoose.Types.ObjectId(userId)
    },{
        editors: mongoose.Types.ObjectId(userId)
    }]}, callback)
}
novelSchema.statics.getNovel = function(userId, novelId, callback){
    return this.find({
	    '$and':[
		    {
		      '_id': novelId
		    },{
				'$or':[
					{
						'admin': mongoose.Types.ObjectId(userId)
					},{
						'editors': mongoose.Types.ObjectId(userId)
					}
				]
		    }
	    ]
    }).populate('chapters').exec(function(err, docs){
    	return callback(err, docs);
    })
}

module.exports = mongoose.model("Novel", novelSchema)