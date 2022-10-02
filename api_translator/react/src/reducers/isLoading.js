import {ActionTypes} from '@app/constants';

const isLoading = (state = {state: false, description: ""}, action)=>{
	switch(action.type){
		case ActionTypes.START_LOADING:
			return {state: true, description: action.payload};
		case ActionTypes.COMPLETE_LOADING:
			return {state: false};
		default:
			return state;
	}
}

export default isLoading