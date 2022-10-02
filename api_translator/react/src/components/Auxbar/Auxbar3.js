// import React from "react"
// import { useDispatch, useSelector } from "react-redux"

// import {prevWord, nextWord} from '@app/actions'
// const Auxbar3 = ()=>{
// 	const addAskValues = [null, "Ask M", "Add M", "Ask P", "Add P"]
// 	const [addAsk, setAddAsk] = React.useState(null);
// 	const dispatch = useDispatch();

// 	const currentSentenceIndex = useSelector(state => state.activeSentence)
// 	const currentWordIndex = useSelector(state => state.activeWord);
// 	const minWordIndex = 0;
// 	const maxWordIndex = useSelector(state => 
// 		state.sentences[currentSentenceIndex].engSentence.length -1
// 	) 

// 	const currentWord = useSelector(state => state.sentences[currentSentenceIndex].engSentence[currentWordIndex]);

// 	const movePrevWord = ()=>{
// 		if(currentWordIndex > minWordIndex) dispatch(prevWord(minWordIndex));
// 	}
// 	const moveNextWord = ()=>{
// 		if(currentWordIndex < maxWordIndex) dispatch(nextWord(maxWordIndex));
// 		// else dispatch to new sentence
// 	}
// 	return (
// 		<div className="translatebar">
// 			<div className="translatebar-header">{currentWord.engWord}</div>
// 			<div className="translatebar-body">This is body</div>
// 			<div className="translatebar-footer auxbar small-auxbar fbox">
// 				<div onClick={movePrevWord}>Prev</div>
// 				<div onClick={()=>setAddAsk(addAskValues[1])}>{addAskValues[1]}</div>
// 				<div onClick={()=>setAddAsk(addAskValues[2])}>{addAskValues[2]}</div>
// 				<div onClick={()=>setAddAsk(addAskValues[3])}>{addAskValues[3]}</div>
// 				<div onClick={()=>setAddAsk(addAskValues[4])}>{addAskValues[4]}</div>
// 				<div onClick={moveNextWord}>Next</div>
// 			</div>
// 		</div>
// 	)
// }
// export default Auxbar3