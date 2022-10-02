import React from "react"
import { useParams, useNavigate } from 'react-router-dom'

import './AddChapter.css'
import { Input } from '@app/components'
import {client } from '@app/sanity_client'
import generateId from '@app/utils/generateId'

const initialChapterForm = {ChapterNumber: '', ChapterName: '', ChapterText: ''}
const AddChapter = ()=>{
	const { novelId } = useParams();
	const navigate = useNavigate();


	const [chapterForm, setChapterForm] = React.useState(initialChapterForm);
	const isUploading = React.useRef()

	const ok =()=>{
		if(isUploading.current){
			alert('uploading plese wait')
			return
		}
		isUploading.current = true;
		const docs = {
			_type: 'chapter',
			index: parseInt(chapterForm.ChapterNumber),
			name: chapterForm.ChapterName,
			novel: {
				_type: 'reference',
				_ref: novelId
			},
			sentences: chapterForm.ChapterText.split('.').map(sentence => ({
				eng:sentence.split(" ").map(word => ({word:word, code:0, _key: generateId()})),
				mm: "",
				_key: generateId()
			}))
		}
		client.create(docs).then(data=> navigate(`/chapter/${data._id}`))
	}
	const cancel = ()=>{
		navigate(`/novel/${novelId}`)
	}
	return (
		<div className='addForm flexCol'>
			<Input name='ChapterNumber' change={setChapterForm} state={chapterForm} type="number"/>
			<Input name='ChapterName' change={setChapterForm} state={chapterForm} />
			<textarea className='addChapterText' name="ChapterText" value={chapterForm.text} onChange={e=>setChapterForm(prevForm=>({...prevForm, ChapterText: e.target.value}))}></textarea>
			<button onClick={ok}>Ok</button>
			<button onClick={cancel}>Cancel</button>
		</div>
	)
}
export default AddChapter