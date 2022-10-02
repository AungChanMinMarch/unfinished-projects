import React from "react"
import {useNavigate, useParams, Link, useLocation} from "react-router-dom"

import {Input, InputFooter} from "@app/components"
import { addNovel } from "@app/actions"
import {initialNovelForm} from '@app/utils/forms.js'

let form = initialNovelForm
const AddNovel = ()=>{
	const navigate = useNavigate();
	const {name} = useParams();
	const location = useLocation();
	const search = window.location.search.substring(1);
	console.log(search);
	if(search){
		const novel = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')+'"}')
		form = novel
	}
	
	const [novelForm, setNovelForm] = React.useState(form);

	const addNovelHandler = ()=>{
		addNovel(novelForm)
	}
	const cancelHandler = ()=>{
		history.back()
	}
	return (
		<div className='addForm fbox'>
			<Input label="Novel Name" name="name" state={novelForm} setter={setNovelForm}/>
			<Input label="Translated Name" name="mmName" state={novelForm} setter={setNovelForm}/>
			<Input label="Author" name="author" state={novelForm} setter={setNovelForm}/>
			<Input label="Translator" name="translator" state={novelForm} setter={setNovelForm}/>
			<InputFooter ok={addNovelHandler} cancel={cancelHandler} />
		</div>
	)
}
export default AddNovel