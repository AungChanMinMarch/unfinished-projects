const User = require('../models/user.js')
const Question = require('../models/question.js')

exports.search = function(req, res){
	const { keyword } = req.params
	User.searchUsers(keyword).exec(function(err, docs){
		if(err)
    		return res.status(500).send({message: err});
		else res.status(200).json({
			users: docs,
			message: 'search success'
		})
	})
}
exports.summaryNotis = function(req, res){
	User.getSummaryNotis(req.userId, function(err, docs){
		if(err)
			return console.log(err);
		else
			res.status(200).json({
				noticount: docs,
				message: 'These are notifications'
			})
	})
}
exports.getNotis = function(req, res){
	User.getNotis(req.userId).exec(function(err, docs){
		if(err)
			return console.log(err);
		else
			res.status(200).json({
				notis: docs,
				message: 'These are notifications'
			})
	})
}
exports.getInvites = function(req, res){
	User.getInvites(req.userId).exec(function(err,docs){
		if(err)
			return console.log(err);
		else
			res.status(200).json({
				invites: docs,
				message: 'These are notifications'
			})
	})
}
exports.getQuestions = function(req, res){
	User.getQuestions(req.userId, function(err,docs){
		if(err)
			return console.log(err);
		else
			res.status(200).json({
				questions: docs,
				message: 'These are questions'
			})
	})
}