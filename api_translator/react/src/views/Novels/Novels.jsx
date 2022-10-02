import React from "react"

import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import { toast } from 'react-toastify'
import { NovelSlug } from "@app/components"
import { signOut } from "@app/actions"
import { getNovels, deleteNovel } from "@app/actions"

import Sidebar from './Sidebar.jsx'

const Home = ()=>{
	const isAdmin = true;//owner of novel
	const [novels, setNovels] = React.useState(null);
	const [view, setView] = React.useState('novel');
	
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	React.useEffect(()=>{
		getNovels(setNovels)
	}, [])
	function handler(e){
		e.stopPropagation();
		e.preventDefault();
	}
	const deleteNovelHandler = (e, novelId) =>{
		handler(e)
		deleteNovel(novelId).then(res =>{
			setNovels(prev => prev.filter(item => item._id != novelId))
		})
	}
	
	function editHandler(e, novel){
		handler(e);
		const paramQuery = new URLSearchParams(novel)
		navigate('/novel/add?'+ paramQuery)
	}
	function addEditorHandler(e, novelId){
		handler(e)
		navigate(`/invite/${novelId}`)
	}
	return (
		<div>
			{!novels 
				? <div className="loading">Loading novels please wait...</div>
				: novels.length === 0  
					? <div className="initial">There is no novel. please click add button to create a new one.</div>
					: novels?.map((novel) => (
						<Link 
							to={`/novel/${novel._id}`}
							key={novel._id}
						>
							<NovelSlug novel={novel}>
								{ isAdmin &&
									<>
						<img onClick={(e)=>editHandler(e, novel)} src="/edit.svg" alt="edit" />
						<img onClick={(e)=>addEditorHandler(e, novel._id)} src="/addPerson.svg" alt=" ask"/>
						<img onClick={(e)=>deleteNovelHandler(e, novel._id)} src="/tool/delete.svg" alt="delete" />
									</>
								}
							
							</NovelSlug>
						</Link>
					))
			}
			<Link className='addBtn' to="/novel/add">Add</Link>
		</div>
	)
}
export default Home
        	// <pre>
        	// Question : 
        	// 	_id: ObjectId,
        	// 	question: 'String',
        	// 	peopleWhoGotAsked: [User],
        	// 	answers: [
        	// 		anserer: User,
        	// 		answer: String
        	// 	],
        	// 	ThingThatGotAsked: Sentence || Paragraph || Chapter || Novel || [then(Sentence, ....)]

        	// 	<h1>Coorpating</h1>
        	// 	No one can see the Thing except the creator. Others can only see the Thing through question (referencing and populating)
        	// 	A Sentence is like a facebook post or a cark in trello.
        	// 	sentence: 
        	// 		_id: Objeck id,
        	// 		engSentence: obj,
        	// 		mmSentence: String /obj,
        		
        	// 	A pargraph is array of sentence.
        	// 		_id: Objeck id,
        	// 		sentences: [sentence],
        	// </pre>