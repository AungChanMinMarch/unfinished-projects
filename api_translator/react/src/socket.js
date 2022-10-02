import { io } from "socket.io-client";
import store from '@app/redux/store.js'

import { ActionTypes } from '@app/constants.js'

let socket;
const { dispatch } = store
export const init = ()=>{
	socket = io("http://192.168.100.76:3000",{
		withCredentials: true
	});
	socket.on('connect_error', err =>{
		console.log(err);
	})

	socket.on('connection', ()=>{
		console.log('connected');
	})
	socket.on('notify',(payload)=>{
		console.log(payload);
		dispatch({
			type: ActionTypes.ADD_NOTIFICATION,
			payload: payload
		})
	})
}
export const emitNoti = (noti)=>{
	console.log(socket);
	socket.emit('notify', noti)
	console.log('emited');
}
