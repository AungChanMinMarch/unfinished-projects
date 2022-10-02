// import React from "react"
// import { useDispatch, useSelector } from "react-redux"

// import { prevWord, nextWord, mergeWord, loadSentences, breakSentence } from "@app/actions"
// import {setTool} from '@app/actions'
// import {nanoid} from "nanoid"

// const generateId = ()=>{
// 	return Date.now().toString(36) + nanoid(3)
// }

// const Auxbar2 = ({backup})=>{
// 	const dispatch = useDispatch();

// 	const currentSentence = useSelector(state => state.activeSentence)
// 	const currentIndex = useSelector(state => state.activeWord)
// 	const minIndex = 0;
// 	const maxIndex = useSelector(state => 
// 		state.sentences[currentIndex].engSentence.length -1
// 	) //maxIndex => length starts with 1 and index starts with 0. So -1

// 	React.useEffect(()=>{
// 		if(currentIndex > maxIndex) movePrevWord();
// 	}, [maxIndex])
// 	const movePrevWord = ()=>{
// 		if(currentIndex > minIndex) dispatch(prevWord(minIndex));
// 	}
// 	const moveNextWord = ()=>{
// 		if(currentIndex < maxIndex) dispatch(nextWord(maxIndex))
// 	}
// 	const mergeWordHandler = (index)=>{
// 		dispatch(mergeWord(index, currentSentence))
// 	}
// 	const cancelWordHandler = ()=>{
// 		dispatch(loadSentences(backup.current))
// 		backup.current = null;
// 		dispatch(setTool(null))
// 	}
// 	const breakSentenceHandler = (input, addPlace)=>{
// 		backup.current = null;
// 		dispatch(setTool(null));
// 		dispatch(breakSentence(currentSentence))
		
// 	}
	
// 	return (
// 		<div className="auxbar small-auxbar fbox">
// 			<div onClick={movePrevWord}> Prev </div>
// 			<div onClick={()=>{
// 				if(currentIndex > 0){ 
// 					mergeWordHandler(currentIndex -1);
// 					movePrevWord()
// 				}
// 			}}> mergeP</div>
// 			<div onClick={cancelWordHandler}> Cancel </div>
// 			<div onClick={breakSentenceHandler}> OK </div>
// 			<div onClick={()=>{
// 			if(currentIndex < maxIndex)
// 				mergeWordHandler(currentIndex)}}> mergeN </div>
// 			<div onClick={moveNextWord}> Next </div>
// 		</div>
// 	)
// }
// export default Auxbar2