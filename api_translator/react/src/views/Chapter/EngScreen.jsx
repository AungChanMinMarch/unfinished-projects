import React from "react"
import { useDispatch, useSelector } from 'react-redux'

import './EngScreen.css'
import { updateSentence, updateActive } from '@app/actions'

// const Sentence = ({sentence, sentenceIndex})=>{
// 	const isActiveSentence = sentenceIndex == activeSentence ;
// 	const activeWord = useSelector(state => state.activeWord);
// 	const className = isActiveSentence ? 'sentence active' : 'sentence'
// 	return(
// 		<div className={className}>
// 			{
// 				sentence.engSentence.map((word, wordIndex) => 
// 					<span 
// 						key={word._id}
// 						className={isActiveSentence & wordIndex == activeWord
// 							? 'word active' : 'word'}
// 					>
// 						{word.engWord}
// 					</span>
// 				)
// 			}
// 		</div>
// 	)	
// }
// function getNormalEngSentence(obj){
// 	const initialValue = "";
// 	const reducer = (prevValue, currentWord) => `${prevValue} ${currentWord.engWord}`
// 	return obj.engSentence.reduce(reducer, initialValue)
// }
const EngScreen = ()=>{
	const sentences = useSelector(state => state.sentences);
	const activeSentence = useSelector(state => state.active.index);
	const input = useSelector(state => state.active.input)
	const onchange =(e)=>{
		updateActive(e.target.value)
	}

	return (
		<div className='EngScreen scrollbar-hidden'>
		{
		sentences && sentences.map((sentence, index) => 
				<div
					key={sentence._id} 
					className={`sentence ${activeSentence == index && 'active'}`}
				>
					<div className="engSentence">{sentence.engSentence}</div>
					<div className="mmAuto"><b>Memory : </b> {sentence.memory}</div>
					{activeSentence === index && 
						<textarea 
							name="" 
							className="mmSentence"
							rows="10"
							autoFocus = {true}
							// onFocus={(e)=> e.target.select()}
							// defaultValue={sentence.mmSentence}
							value={input}
							onChange={onchange}
						/>
					}
				</div>
			)
		}
		</div>
	)
}
export default EngScreen