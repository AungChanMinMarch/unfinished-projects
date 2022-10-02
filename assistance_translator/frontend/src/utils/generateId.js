import {nanoid} from "nanoid"

const generateId = ()=>{
	return Date.now().toString(36) + nanoid(3)
}
export default generateId;