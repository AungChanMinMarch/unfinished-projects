import {ActionTypes} from '@app/constants'
import {nanoid} from "nanoid"

const generateId = ()=>{
	return Date.now().toString(36) + nanoid(3)
}
const insert = (array, index, value) => [...array.slice(0, index), value, ...array.slice(index)];

const sentences = (state = null, action)=>{
	switch(action.type){
		case ActionTypes.SET_SENTENCES:
			return action.payload
		case ActionTypes.DELETE_SENTENCE:
		console.log(action.payload._id);
			return state.filter((sentence)=> sentence._id != action.payload._id);
		case ActionTypes.ADD_SENTENCE:
			const newSentence = {
				engSentence: action.payload.input.split(" ").map(word => ({
					engWord:word, 
					meaningCode: 0, 
					prepCode: 0,
					_id: generateId()
				})),
				mmSentence: "",
				_id: generateId()
			}
			return insert(state, action.payload.index, newSentence);
		case ActionTypes.MERGE_SENTENCE:
			const sentenceIndex = action.payload.index;
			let obj = {};
			obj.engSentence = state[sentenceIndex].engSentence.concat(state[sentenceIndex + 1].engSentence);
			obj.mmSentence = state[sentenceIndex].mmSentence + state[sentenceIndex+1].mmSentence;
			obj._id = state[sentenceIndex]._id
			const removed = state.filter((item, index) => index != sentenceIndex+1)
			const merged = removed.map((item, index) => index == sentenceIndex ? obj : item)
			return merged;
		case ActionTypes.UPDATE_SENTENCE:
			return state.map((sentence, index) => 
				index === action.payload.index 
					? {...sentence, mmSentence: action.payload.input} 
					: sentence)
		case ActionTypes.DELETE_WORD:
			return state.map((sentence, index)=>(index != action.payload.currentSentence ? sentence : {...sentence, engSentence: sentence.engSentence.filter((word, i)=>i!=action.payload.currentWord)}));
		case ActionTypes.ADD_WORD:
			const newWord ={
				engWord: action.payload.input, 
				meaningCode: 0, 
				prepCode: 0,
				_id: generateId()
			}
			return state.map((sentence, index)=>(index != action.payload.currentSentence ? sentence : {...sentence, engSentence: insert(sentence.engSentence, action.payload.index, newWord)}));
		case ActionTypes.MERGE_WORD:
			const wordIndex = action.payload.index;
			const parentObj = state[action.payload.currentSentence].engSentence
			let wordObj = {};
			wordObj.engWord = parentObj[wordIndex].engWord + " " + parentObj[wordIndex+1].engWord;
			wordObj.meaningCode = 0 //resetting
			wordObj.prepCode = 0 //resetting
			wordObj._id = parentObj[wordIndex]._id

			const removedSentence = parentObj.filter((word, index) => index != wordIndex+1)
			const mergedSentence = removedSentence.map((item, index) => index == wordIndex ? wordObj : item)
			return state.map((sentence, index) => index != action.payload.currentSentence
				? sentence
				: {...sentence, engSentence: mergedSentence}
				)
		case ActionTypes.BREAK_SENTENCE:
			const currentSentence = action.payload;
			const before = state.slice(0, currentSentence);
			const after = state.slice(currentSentence + 1)
			const words = state[currentSentence].engSentence;
			let arr = [];
			for(let i=0; i < words.length; i++){
				arr.push({
					engSentence: words[i].engWord.split(" ").map(word => ({
						engWord: word,
						meaningCode: 0,
						prepCode: 0,
						_id: generateId()
					})), 
					mmSentence: '',
					_id: words[i]._id
				})
			}
			return [...before, ...arr, ...after]
		default:
			return state;
	}
}

export default sentences