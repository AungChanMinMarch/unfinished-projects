import {ActionTypes} from '@app/constants';

const notis = (state = [], action)=>{
	switch(action.type){
		case ActionTypes.SET_NOTIFICATIONS:
			return action.payload;
		case ActionTypes.ADD_NOTIFICATION:
			return [action.payload, ...state];
		default:
			return state;
	}
}

export default notis