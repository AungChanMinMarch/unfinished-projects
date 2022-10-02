import { ActionTypes } from '@app/constants'

const activeTool = (state = null, action)=>{
	switch(action.type){
		case ActionTypes.SET_TOOL:
			return action.payload.tool
		default:
			return state
	}
}

export default activeTool;