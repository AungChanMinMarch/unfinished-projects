import React from "react"
import { useNavigate} from 'react-router-dom'

import './NovelSlug.css'

const NovelSlug = ({ novel, deleteHandler, children })=>{
	const navigate = useNavigate();
	function handler(e){
		e.stopPropagation();
		e.preventDefault();
	}
	function editHandler(e){
		handler(e)
		navigate('/addnovel')
	}
	function addEditorHandler(e){
		handler(e)
		navigate(`/invite/${novel._id}`)
	}
	return (
		<div className="NovelSlug slug">
			{
			novel.img
				? <img src={novel.img} alt="novel photo" className="NovelSlug-picture"/>
				: <div className="NovelSlug-picture nopicture" />
			}
			<div className="NovelSlug-info">
				<h2>{novel.name}</h2>
				<h4>mm : {novel.mmName}</h4>
				<h4>Author : {novel.author}</h4>
				<h4> Translator : {novel.translator}</h4>
				<div className='NovelSlug-tools'>
					{children}
				</div>
			</div>
		</div>
	)
}
export default NovelSlug