const mongoose = require("mongoose")
const Novel = require('../models/novel.js')
const Invite = require('../models/invite.js')

function callback(err, count, res, next){
	if(err) return res.status(500).send({message: err});
	else if(count === 0){
    	return res.status(403).json({
    		message : 'The novel does not exist Or you cannot access this novel'
    	}) 
    } else if(count === 1){
    	next();
    } else{
    	console.log('query error or more than one docs with the same _id in isAdmin middleware');
    }
}

exports.isAdmin = function(req, res, next){
    const {novelId} = req.params;
	Novel.find({
    	_id: novelId, 
    	admin: mongoose.Types.ObjectId(req.userId)
  	}).count(function(err, count){
  		callback(err, count, res, next)
  	})
}

exports.isInvitee = function(req, res, next){
	const { inviteId } = req.params;
	Invite.findById(inviteId, function(err, docs){
		if(err) return res.status(500).send({message: err});
		//do not use === (it returns false)
	  	if(docs.invitee == req.userId){
	  		req.invite = docs;
	  		next()
	  	}
	  	else res.status(403).json({
    		message : 'The novel does not exist Or you cannot access this novel'
    	}) 
  	})
}