// const authUser = require('./middlewares/authUser.js')
const cookie = require('cookie')
const jwt = require("jsonwebtoken");
let onlineUsers = [];
function addNewUser(userEmail, userId, socketId){
	if (!onlineUsers.some(user => user.userId === userId))
		onlineUsers.push({ userEmail, userId, socketId})
}
function getUser(userEmail){
	return onlineUsers.find(user => user.userEmail === userEmail)
}
module.exports = function (io){
	const { getNotifications } = require('./notificationsHandler.js')(io);
	console.log('created socket io server');
	io.use(authUser);
	io.on('connection', socket =>{
		console.log('someone connected. Adding new User...');
		addNewUser(socket.userEmail, socket.userId, socket.id);

		socket.on('notify', (payload)=>{
			console.log('Successfully received');
			console.log(payload);
			const receiver = getUser(payload.receiverEmail);
			if(receiver){
				console.log('thsi is noti sending...', payload);
				socket.to(receiver.socketId).emit('notify', payload)
			}
		});

		if(socket.userId){
			getNotifications(socket.userId)
			.then(res => socket.emit('notify', res))
		}
		socket.on('disconnection', ()=>{
			console.log('someone left');
		})
	});
}
function authUser(socket, next){
	const cookies = cookie.parse(socket.handshake.headers.cookie)
	const token = cookies.token;
	if (!token) return new Error('no token')
	jwt.verify(token, process.env.API_SECRET, (err, decode)=> {
    	if (err) return new Error(err)
    	if(!decode){
      		// Delete cookie because token is invalid or expired
    		return new Error('invalid token')
    	}
	    console.log('verify token success..');
	    socket.userId = decode.id;
	    socket.userEmail = decode.email;
	    next();
	});
}