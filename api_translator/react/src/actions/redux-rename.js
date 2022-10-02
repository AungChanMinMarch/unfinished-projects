import { ActionTypes } from '@app/constants.js'
import { GET, POST, DELETE } from './instance.js'
import instance from './instance.js'
import { toast, Flip } from 'react-toastify'

const baseURL = process.env.API_URL
const test = (description, someAsynFunc, action)=>{
	const toastId = toast(description, {
		autoClose: false,
		closeButton: false
	})
	return (dispatch) => 
	someAsynFunc()
	.then(res => {
		dispatch(action);
		toast.update(toastId, {
			render: res.data?.message,
			type: toast.TYPE.SUCCESS,
			autoClose: 500,
			closeButton: null,
			transition: Flip
		})
	})
	.catch(err => {
		toast.update(toastId, {
			render: err.response.data?.message,
			type: toast.TYPE.ERROR,
			autoClose: 500,
			transition: Flip
		})
	})
}
export const signIn = (form) => test(
	'signing in....', 
	async()=>POST('auth/signin', {
        email: form.email,
        password: form.password
    }),
    {type: ActionTypes.SIGN_IN}
)
export const signOut = () => test(
	'signing out...',
	async () => GET('auth/signout'),
	{ type: ActionTypes.SIGN_OUT }
)
export const signUp = (form)=> test(
	'creating a newer user...',
	async () => POST('auth/signup', {
		name: form.name,
        email: form.email,
        password: form.password
    }),
	{type: ActionTypes.SIGN_IN}
)

export const setTool = (tool) => ({type: ActionTypes.SET_TOOL, payload:{tool}})

export const loadSentences = (novelId, chapterId) => {
	console.log(window.location.href);
	return (dispatch) => GET('chapter/'+ chapterId)
		.then(res => dispatch({
			type: ActionTypes.SET_SENTENCES,
			payload: res.sentences
		}))
}

export const breakSentence = (index) => ({
	type: ActionTypes.BREAK_SENTENCE, payload: index
})

export const nextSentence = () => ({
	type: ActionTypes.NEXT_SENTENCE,
})
export const prevSentence = () =>({
	type: ActionTypes.PREV_SENTENCE,
})
export const deleteSentence = (id) => ({
	type: ActionTypes.DELETE_SENTENCE,
	payload:{_id: id}
})
export const addSentence = (input, index) => ({
	type: ActionTypes.ADD_SENTENCE,
	payload: {input, index}
})
export const mergeSentence = index => ({
	type: ActionTypes.MERGE_SENTENCE,
	payload: {index}
})

export const nextWord = () => ({
	type: ActionTypes.NEXT_WORD,
})
export const prevWord = () =>({
	type: ActionTypes.PREV_WORD,
})
export const deleteWord = (currentSentence, currentWord) => ({
	type: ActionTypes.DELETE_WORD,
	payload:{currentSentence, currentWord}
})
export const addWord = (input, currentSentence, index) => ({
	type: ActionTypes.ADD_WORD,
	payload: {input, currentSentence, index}
})
export const mergeWord = (index, currentSentence) => ({
	type: ActionTypes.MERGE_WORD,
	payload: {index, currentSentence}
})