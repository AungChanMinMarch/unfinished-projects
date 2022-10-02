import React from "react"

import './QuestionSlug.css'
import Sentence from "./Sentence.jsx"

const QuestionSlug = ({ question })=>{
	return (
		<div className="slug QuestionSlug">
			<h2>{question.question}</h2>
			<div className="QuestionSlug-body">
				{
					question.sentences
					// .map((sentence) => (
					// 	{sentence}
					// 	// <Sentence
					// 	// 	key={sentence._id}
					// 	// 	className="QuestionSlug-sentence"
					// 	// 	sentence={sentence}
					// 	// />
					// ))
				}
			</div>
		</div>
	)
}
export default QuestionSlug