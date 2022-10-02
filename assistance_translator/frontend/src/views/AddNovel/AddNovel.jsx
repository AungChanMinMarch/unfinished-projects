import React from "react"
import { useNavigate } from 'react-router-dom'

import './AddNovel.css'
import { Input } from '@app/components/index.js'
import {client} from '@app/sanity_client'
import { novelsQuery } from '@app/utils/data'

const initialForm = {Name: '', MyanmarName: '',Author: '', Translator: ''}
const AddNovel = (e)=>{
	const navigate = useNavigate();
	const userId = React.useRef(null)

	const [form, setForm] = React.useState(initialForm)
	const isUploading = React.useRef();

	React.useEffect(()=>{
		const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    	if(!userInfo){
    		console.log('you have not logged in. Login first.')
    		navigate('/auth')
    	}
    	const id = userInfo?.googleId;
    	if(!id){
    		console.log("you have not logged in. Login first.");
    		localStorage.clear();
    		navigate('/auth')
    	}
    	if(id) userId.current = id
	})
	const ok = ()=>{
		console.log(form);
		if(!form.Name){
			alert('The name of novel cannot be empty');
			return
		}
		if(isUploading.current){
			alert('your data is uploading. please wait...')
			return
		}
		isUploading.current = true;
		const novel = {
			_type: 'novel',
			name: form.Name,
			mm_name: form.MyanmarName,
			author: form.Author,
			translator: form.Translator,
			chapters: [],
			creator: {
				_type: 'reference',
				_ref: userId.current
			}
		}
		client.create(novel).then((res)=>{
			console.log('novel created. data:',res)
			navigate(`/novel/${res._id}`, {replace : false})
			isUploading.current= false//idk if this necessary
		}).catch(err =>{
			isUploading.current=false
			console.error(err);
		})
	}
	const cancel = ()=>{
		setForm(initialForm);
		navigate("/")
	}
	return (
		<div className='addForm'>
			<Input name="Name" change={setForm} state={form} />
			<Input name="MyanmarName" change={setForm} state={form} />
			<Input name="Author" change={setForm} state={form} />
			<Input name="Translator" change={setForm} state={form} />
			<button onClick={cancel}>Cancel</button>
			<button onClick={ok}>Ok</button>
		</div>
	)
}
export default AddNovel