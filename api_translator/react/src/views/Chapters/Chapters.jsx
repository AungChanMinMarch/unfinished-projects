import React from "react"
import { useParams, Link } from 'react-router-dom'

import { getNovel } from "@app/actions"

import './Chapters.css'

const ChapterSlug = ({ chapter })=>{
	return (
		<Link 
			to={`/novel/chapter/${chapter._id}`} 
			className='ChapterSlug slug'
		>
			<div className='ChapterSlug-info'>
				<h2>Chapter : {chapter.index}</h2>
				<h4>{chapter.name}</h4>
			</div>
			<img src="/edit.svg" alt="edit" />
			<img src="/questions.svg" alt=" ask"/>
			<img src="/tool/delete.svg" alt="delete" />
		</Link>
	)
}

const Novel = ()=>{
	const [novel, setNovel] = React.useState(null)
	const {novelId} = useParams();
	React.useEffect(()=>{
		getNovel(novelId, setNovel)
	}, []);

	return (
		<div className="novel view">
			{novel?.name && <h2 className="novelName">{novel.name}</h2>}
			{!novel
				? <div className="loading">Loading chapters please wait</div>
				: novel.chapters.length === 0
					? <div className="initial">There is no chapter. Click add icon and create one.</div>
					: novel.chapters.map(chapter => (
						<ChapterSlug 
							key={chapter._id}
							chapter={chapter}
							deleteHandler={()=>{}}
						/>
					))
			}
			<Link className='addBtn' to={`/novel/${novelId}/add`}>Add</Link>
		</div>
	)
}
export default Novel