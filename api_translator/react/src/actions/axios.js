import axios from 'axios'

const instance = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		'Content-Type': 'application/json',
		// timeout: 1000,
	},
    withCredentials: true
});
instance.interceptors.response.use(response => {
		if(response.data.notis?.length > 0) {
			console.log(response.data.noti, 'hello');
			dispatch({
				type: ActionTypes.SET_NOTIFICATIONS,
				payload: response.data.notis
			})
		}
		return response
	}, err =>{
		console.log(err.response);
	if(err.response.status === 401)	dispatch({type: ActionTypes.SIGN_OUT})
		// handle for 403 (server knows who you are but server won't allow you to see it)
	throw err
})
export const POST = (pathname, data) => instance({
    method: 'post',
	url: pathname,
	data: data
})
export const GET =  (pathname)=> instance({
	method: 'get',
	url: pathname,
})
export const DELETE =  (pathname)=> instance({
	method: 'delete',
	url: pathname,
})