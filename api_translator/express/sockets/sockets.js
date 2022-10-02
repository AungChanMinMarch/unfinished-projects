const { Server } = require('socket.io');
const Chapter = require('../models/chapter.js')

module.exports = function(httpServer){
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_ORIGIN,
            credentials: true,
            methods: ['GET', 'POST']
        }
    })
    io.on('connection', socket =>{
        console.log('someone connected. Adding new User...');
        // addNewUser(socket.userEmail, socket.userId, socket.id);
        socket.on('update', (payload, callback)=>{
            const { chapterId, index, newSentence } = payload;
            console.log('updaing chapter id:', chapterId);
            Chapter.findByIdAndUpdate( chapterId, {
                [`sentences.${index}.mmSentence`]: newSentence}, function(err, docs){
                if(err) console.log(err);
                else {
                    console.log("success");
                    callback()
                }
            })
        })
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