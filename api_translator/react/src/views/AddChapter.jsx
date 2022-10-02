import React from "react"
import {useParams, useNavigate} from "react-router-dom"

import {Input, InputFooter} from '@app/components'
import { addChapter } from "@app/actions"

const initialForm = {
	chapterIndex: "",
	chapterName: "",
	sentences: ""
}
const AddChapter = ()=>{
	const navigate = useNavigate();
	const {novelId} = useParams();
	const [chapterForm, setChapterForm] = React.useState(initialForm);
	const addChapterHandler = ()=>{
		//check validating here
		addChapter(novelId, chapterForm)
		.then(res => {
			console.log(res);
			// navigate(`/${novelId}/${res.data._id}`,{
			// 	state: res.data
			// })
		})
		.catch(err => console.log(err))
	}
	const cancelHandeler = () =>{
		setChapterForm(initialForm)
		navigate(-1, {replace: true})
	}
	return (
		<div className="addForm">
			<Input label="Chapter Name" name="chapterName" state={chapterForm} setter={setChapterForm}/>
			<Input label="Chapter Index" name="chapterIndex" type='number' state={chapterForm} setter={setChapterForm}/>
			<textarea 
				className="addChapterTextarea"
				onChange ={
					(e)=>setChapterForm(prev=>({...prev, sentences:e.target.value}))
				}
			></textarea>
			<InputFooter 
				cancel={cancelHandeler} 
				ok={addChapterHandler} 
			/>
		</div>
	)
}
export default AddChapter