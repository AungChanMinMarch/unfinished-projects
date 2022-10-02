export default (novels, action)=>{
	switch(action.type){
		case 'FETCH_ALL':
			return action.payload;
		case 'FETCH_ALL':
			return novels;
		default:
			return novels

	}
}