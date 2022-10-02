const User = require('../models/user.js')
module.exports = function(io){
	const getNotifications = async function(userId){
		return new Promise((res, rej)=>{
			User
			.findById(userId)
			.populate('noti')
			.exec(function(err, docs){
				if(err) return new Error('idk');
				if(!docs) return new Error('IDK')
				res(docs.noti)
			})
		})
	}
	return { getNotifications }
 }