import { GET, DELETE, POST } from './axios.js'
import { toastFetch } from './toast.js'

import { ActionTypes } from '@app/constants.js'
import store from '@app/redux/store.js'

const { dispatch } = store

export const signIn = (form) => {
	toastFetch(
		'signing in....', 
		POST('auth/signin', {
	    	email: form.email,
	    	password: form.password
		})
	).then((res)=> {
		dispatch({
			type: ActionTypes.SIGN_IN
		});
	}).catch(err =>{
		console.log('should not sign in..', err);
	})
}
export const signOut = () => {
	toastFetch(
		'signing out...',
		GET('auth/signout')
	).then(()=> dispatch({ 
		type: ActionTypes.SIGN_OUT 
	}))
}
export const signUp = (form)=> {
	toastFetch(
		'creating a newer user...',
		POST('auth/signup', {
			name: form.name,
	        email: form.email,
	        password: form.password
	    })
	).then(res => {
		dispatch({type: ActionTypes.SIGN_IN})
	})
}