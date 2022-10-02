import {ActionTypes} from '@app/constants'

const activeWord = (state = 0, action)=>{
	switch(action.type){
		case ActionTypes.NEXT_WORD:
			return state + 1;
		case ActionTypes.PREV_WORD:
			return state - 1;
		default:
			return state;
	}
}

export default activeWord