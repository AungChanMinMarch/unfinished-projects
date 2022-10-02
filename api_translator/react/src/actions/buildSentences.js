const axios = require('axios');
import { ActionTypes } from '@app/constants.js'
import store from '@app/redux/store.js'
const { dispatch } = store;

export default async function(text, email){
	const sentences = text.split('.');
	let dbSentences = [];
	let promises = [];

	if(sentences[0].indexOf('Light novel online')==1 ||
		sentences[0].indexOf('Light novel online')==2){
		sentences.splice(0,4);
		const max = sentences.length -1;
		sentences.splice(max-6,max)
	    sentences[sentences.length-1] = sentences[sentences.length-1].replace("So sad that you don't have an account", "");
	}
	const response = await fetch('https://api.ipify.org/?format=json')
	const ip = await response.json();
	for(let i=0; i<sentences.length; i++){
		sentences[i].split('\n').map(s => {
			if(s.trim().length === 0){
				// console.log('skip empty sentence', s);
			} else{
				const uri = `https://api.mymemory.translated.net/get?q=${s}!&langpair=en|my&ip=${ip}`
				promises.push(axios.get(encodeURI(uri))
					.then(res=>{
						// console.log(res.data.responderId);
						dbSentences.push({
							engSentence: s,
							memory: res.data.responseData.translatedText,
							mmSentence: ""
						})
					}).catch(err => {
	dispatch({type: ActionTypes.START_LOADING, payload: JSON.stringify(err)})

					}
				))
			}
		})
	}
	return Promise.all(promises).then((res)=>{
		console.log('done translating');
		return dbSentences
	})
}
// sentences: sentences.split('.').map(sentence => ({
    //   engSentence: sentence.split(" ").map(word => ({
    //     engWord:word, 
    //     meaningCode: 0, 
    //     prepCode: 0
    //   })),
    //   mmSentence: "",
    // }))