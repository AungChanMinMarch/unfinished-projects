export const getBy_type_refId = (type, refId)=>{
	const query = `*[ _type == "${type}" && references("${refId}") ]`
	console.log(query);
	return query;	
}

export const novelsQuery = (userId)=>{
	let query = `*[ _type == "novel" && references("${userId}") ]`
	return query;
}

export const chaptersIdQuery = (novelId) =>{
	let query = `*[ _type == "chapter" && references("${novelId}")] | order(index asc) {_id, name, index}`
	return query
}

export const categoryQuery = '*[ _type == "category"]'

export const getAppData = JSON.parse(localStorage.getItem('app'))

export const saveAppData = (js_obj)=>{
	localStorage.setItem('app', JSON.stringify(js_obj))
}
// const query = `
//   *[ _type == "sentence" ]
//   {_id,eng, "refs": count(*[ references(^._id) ])}
//   [ refs == 0 ]
// `