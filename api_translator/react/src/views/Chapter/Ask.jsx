import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import './Ask.css'
import { askSentences } from "@app/actions"

import { Invite } from '@app/views'
import UserSlug  from '@app/views/Invite/UserSlug.jsx'
const Ask = ()=>{
	const {novelId, chapterId} = useParams();

	const sentences = useSelector(state => state.sentences);

	const [isAdd, setIsAdd] = React.useState(false)
	const [checkedState, setCheckedState] = React.useState();
	const [question, setQuestion] = React.useState("");
	const [respondents, setRespondents] = React.useState([]);

	React.useEffect(()=>{
		if(sentences)
			setCheckedState(new Array(sentences.length).fill(false))
	}, [sentences]);

	if(isAdd){
		return <Invite respondents={respondents} setRespondents={setRespondents} setter={setIsAdd} />
	}
	const changeHandler = (index)=>{
		setCheckedState(prevState => 
			prevState.map((item, i) =>
				i==index ? !item : item
			)
		)
	}
	const askHandler = ()=>{
		if(respondents.length === 0) return alert("respondents cannot be empty");
		let ids = []
		for(let i=0; i<sentences.length; i++){
			if(checkedState[i]) ids.push(sentences[i]._id)
		}
		console.log(ids);
		askSentences(chapterId, question, ids, respondents);
	}
	return (
		<div className="Ask">
			<input 
				type="text" 
				placeholder="Write your question" 
				className="askInput"
				value={question}
				onChange={e=>setQuestion(e.target.value)}
			/>
			<button onClick={askHandler}>Ask Now</button>
			<button onClick={()=>setIsAdd(true)}>Add Respondents</button>
			<div className="respondentsContainer">
				<h3>Respondents</h3>
				{respondents && respondents.map(respondent=>(
					<UserSlug
						key={respondent._id}
						user={respondent}
						onClick={()=>setRespondents(prev=>prev.filter(item=>item!=respondent))}
						text="Don't ask him"
					/>
				))}
			</div>
			<div className="checkboxContainer">
			{
				sentences && checkedState && sentences.map((sentence, index)=>(
					<div key={sentence._id} className="ask-item">
						<input 
							type="checkbox" 
							id={sentence._id}
							checked={checkedState[index]}
							onChange={()=>changeHandler(index)}
						/>
						<label htmlFor={sentence._id}>
							<b>Eng : </b> {sentence.engSentence} <br />
							<b>Memory : </b> {sentence.memory}
						</label>
					</div>
				))
			}
			</div>
		</div>
	)
}
export default Ask