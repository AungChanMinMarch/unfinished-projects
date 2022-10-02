import {ActionTypes} from '@app/constants';

const active = function (state = {index: null, input: ""}, action){
	switch(action.type){
		case ActionTypes.SET_ACTIVE:
			return { 
				index: action.payload.index, 
				input: action.payload.input 
			};
		case ActionTypes.UPDATE_ACTIVE:
			return { 
				...state,
				input: action.payload.input 
			};
		default:
			return state;
	}
}

export default active