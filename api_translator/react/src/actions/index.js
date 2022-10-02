import { io } from "socket.io-client";
import { emitNoti } from '@app/socket.js'

import { GET, DELETE, POST } from './axios.js'
import { toastFetch } from './toast.js'
import buildSentences from './buildSentences.js'
import { ActionTypes } from '@app/constants.js'
import store from '@app/redux/store.js'
const { dispatch } = store;

const getSentencesLength = () => store.getState().sentences.length
const getActiveSentence = () => store.getState().active

const setActive = (index)=>{
	const sentence = store.getState().sentences[index];
	dispatch({
		type: ActionTypes.SET_ACTIVE,
		payload: { 
			index: index, 
			input: sentence.mmSentence === "" ? sentence.memory : sentence.mmSentence
		}
	})
}

export const getNovels = (setter) => {
	toastFetch(
		'loading novels please wait',
		GET('novel/')
	).then(res => {
		setter(res.data.novels);
	})
}
export const addNovel = async (form) => {
	return toastFetch(
		'adding novel...',
		POST('novel/', form)
	).then((res)=>{
		window.location.href = `/novel/${res.data._id}`
		// window.location.href = '/novels'
	})
}
export const getNovel = (novelId, setter) => 
	toastFetch(
		'loading novel please wait',
		GET('novel/' + novelId)
	).then(res => {
		console.log(res.data.novel);
		setter(res.data.novel);
	})

export const searchUsers = (keyword, setter)=>{
	toastFetch('searching ....',
		GET(`user/search/${keyword}`)
	).then(res => {
		setter(res.data.users)
		console.log(res);
	})
}
export const addEditor = (novelId, user) => {
	toastFetch(
		`asking ${user.name} to become your editor...`,
		POST(`novel/addeditor/${novelId}`, {userId: user._id})
	).then(res =>{
		console.log(res.data);
		// emitNoti(res.data.noti)
	})
}
export const getSummaryNotis = (setter)=>{
	GET('user/summaryNotis').then(res=>{
		setter(res.data.noticount);
	})
}
export const getNotis = (setter)=>{
	toastFetch(
		"Getting notifications",
		GET('user/notis')
	)
	.then(res=>{
		setter(res.data.notis);
	})
}
export const getInvites = (setter)=>{
	toastFetch('loading invites', GET('/user/invites'))
		.then(res=>{
			setter(res.data.invites)
		})
}
export const acceptEditor =(inviteId, setter)=>{
	GET(`/novel/accepteditor/${inviteId}`).then(()=>setter(inviteId))
}
export const deleteNovel = async (novel_id)=> 
 DELETE('novel/' + novel_id)

export const addChapter = async (novelId, form) => {
	dispatch({type: ActionTypes.START_LOADING, payload: "processing"})
	buildSentences(form.sentences).then(dbSentences =>{
		dispatch({type: ActionTypes.START_LOADING, payload: "saving"})
		console.log(dbSentences);
		POST('chapter/' + novelId, {
            name: form.chapterName,
            index: form.chapterIndex,
            sentences: dbSentences
		}).then((res)=>{
			window.location.href = `/novel/chapter/${res.data._id}`
		})
	})
}


export const setTool = (tool) => ({type: ActionTypes.SET_TOOL, payload:{tool}})

export const loadSentences = (novelId, chapterId) => {
	GET('chapter/'+ chapterId)
		.then(res => {
			dispatch({
				type: ActionTypes.SET_SENTENCES,
				payload: res.data.novel.sentences
			});
			setActive(0)
		})
}

export const breakSentence = (index) => ({
	type: ActionTypes.BREAK_SENTENCE, payload: index
})

export const moveSentence = async (step) => {
	const { index, input } = getActiveSentence();
	const newIndex = index + step;
	// need -1 because index starts with 0, not 1
	if(newIndex >= 0 && newIndex <= getSentencesLength() - 1) setActive(newIndex)
	return new Promise((resolve, reject)=>{
		const {mmSentence, _id} = store.getState().sentences[index]
		if(input !== mmSentence){
			resolve({index, input})
		}
	})
}
export const prevSentence = async () => {
	// need -1 because index starts with 0, not 1
	const oldActive = getActiveSentence()
	if( oldActive.index > 0) setActive( oldActive.index - 1 )
	return new Promise((resolve, reject)=>{
		if(oldActive.input !== store.getState().sentences[oldActive.index].mmSentence){
			resolve({
				newSentence: oldActive.input
			})
		}
	})
}

export const deleteSentence = (id) => ({
	type: ActionTypes.DELETE_SENTENCE,
	payload:{_id: id}
})
export const addSentence = (input, index) => ({
	type: ActionTypes.ADD_SENTENCE,
	payload: {input, index}
})
export const updateActive = (input) => dispatch({
	type: ActionTypes.UPDATE_ACTIVE,
	payload: {input}
})
export const updateSentence = (index, input) => dispatch({
	type: ActionTypes.UPDATE_SENTENCE,
	payload: { index, input}
})
export const mergeSentence = index => dispatch({
	type: ActionTypes.MERGE_SENTENCE,
	payload: {index: getActiveSentence()}
})

export const askSentences = (chapterId, question, respondents, ids) =>{
	POST(`chapter/ask/${chapterId}`, {question, ids, respondents})
}
export const getQuestions = (setter)=>{
	GET('/user/questions').then(res=> setter(res.data.questions))
}