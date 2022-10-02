import {ActionTypes} from '@app/constants'

const activeSentence = (state = 0, action)=>{
	switch(action.type){
		case ActionTypes.NEXT_SENTENCE:
			return state + 1;
		case ActionTypes.PREV_SENTENCE:
			return state - 1;
		default:
			return state;
	}
}

export default activeSentence