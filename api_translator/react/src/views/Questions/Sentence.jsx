import React from "react"

import './Sentence.css'

const Sentence = ({ sentence })=>{
	const [on, setOn] = React.useState(false);
	const hasAnswers= sentence.answers?.length > 0;
	return (
		<div>
			<div className="question-sentence">
				<p>{sentence.engSentence}</p>
				<button
					onClick={()=>setOn(prevOn => !prevOn)}
				>{
					hasAnswers
						? `${sentence.answers.length} answers`
						: "no answer"
				}</button>
			</div>
			{
				on && 
				(hasAnswers
				? <div
					className="QuestionSlug-answers"
				>
				answers
				</div>
				: "WE ARE SORRY TO TELL YOU THAT NO ONE HAS ANSWERED YOUR QUESTION.")
			}
		</div>
	)
}
export default Sentence