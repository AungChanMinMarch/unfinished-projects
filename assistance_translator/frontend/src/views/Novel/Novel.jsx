import React from "react"
import { useParams, Link } from 'react-router-dom'

import './Novel.css'
import {Slug} from '@app/components'
import {client} from '@app/sanity_client'
import {chaptersIdQuery } from '@app/utils/data'

const Novel = ()=>{
	const [novel, setNovel] = React.useState()
	const [chapters, setChapters] = React.useState([])
	const [isChaptersView, setIsChaptersView] = React.useState(true)

	  const pathname = window.location.pathname.split('/');
  const novelId = pathname[pathname.length - 1];

	React.useEffect(()=>{
		client.getDocument(novelId).then(data => setNovel(data))//for name, authors,..
		client.fetch(chaptersIdQuery(novelId)).then(data => setChapters(data))
	}, []);
	
	return novel
		? <div className='novel'>
			<div className='novel-header'>
				<Link to="/">Home</Link>
				<span>{novel.name}</span>
				<button>Edit</button>
			</div>
			<div className='novel-navbar'>
				<div onClick={()=>setIsChaptersView(true)}>Chapters</div>
				<div onClick={()=>setIsChaptersView(false)}>Puzzles</div>
			</div>
			<div className='novel-body'>
				{
					isChaptersView
					? (chapters.length != 0 
						? chapters?.map(chapter => 
							<Slug 
								key={chapter._id}
								text={chapter.name}
								type='chapter'
								id={chapter._id}
								setter={setChapters}
							/>
						)
						: <div>You haven't added any chapers. Please click Add icon to create chapters</div>
					)
					: <div> This is especially for ma ma.</div>
				}
			</div>
			{isChaptersView && 
				<Link className="addIcon" to= {`/addchapter/${novel._id}`}>Add</Link>}
		</div>
		: <div className="loading">Fetching chapters. Please wait</div>
	
}
export default Novel