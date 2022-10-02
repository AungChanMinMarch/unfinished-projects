import React from "react"
import { toast } from "react-toastify"

import QuestionSlug from"./QuestionSlug.jsx"
import './Questions.css'

import { getQuestions } from '@app/actions'
const Questions = ()=>{
	const [questions, setQuestions] = React.useState([]);
	React.useEffect(()=>{
		// load questions here
		getQuestions(setQuestions)
	}, [])
	return (
		<div className="Questions">
			<div className="Questions-nav">
				<h1>Questions that you asked others</h1>
				<button onClick={()=>toast.info("comming soon")}>filter</button>
			</div>
			{
				questions?.length > 0 &&
				questions.map(question =>(
					<QuestionSlug key="question._id" question={question} />
				))
			}
		</div>
	)
}
export default Questions