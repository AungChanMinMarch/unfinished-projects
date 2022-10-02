// import React from "react"
// import { useDispatch, useSelector } from "react-redux"

// import { prevWord, nextWord, deleteWord, addWord, mergeWord } from "@app/actions"
// import AddForm  from './AddForm.js'


// const Auxbar1 = ()=>{
// 	const dispatch = useDispatch();

// 	const [fromOpened, setFormOpened] = React.useState(false);
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
// 	const deleteWordHandler = ()=>{
// 		dispatch(deleteWord(currentSentence, currentIndex))
// 	}
// 	const addWordHandler = (input, addPlace)=>{
// 		const index = addPlace == 'before' ? currentIndex : currentIndex + 1;
// 		dispatch(addWord(input, currentSentence, index))
// 	}
// 	const mergeWordHandler = (index)=>{
// 		dispatch(mergeWord(index, currentSentence))
// 	}
// 	return (
// 		<div className="auxbar small-auxbar fbox">
// 			{fromOpened && <AddForm setter={setFormOpened} addNow={addWordHandler} />}
// 			<div onClick={movePrevWord}> Prev </div>
// 			<div onClick={()=>{
// 				if(currentIndex > 0){ 
// 					mergeWordHandler(currentIndex -1);
// 					movePrevWord()
// 				}
// 			}}> mergeP</div>
// 			<div onClick={deleteWordHandler}> Delete </div>
// 			<div onClick={()=>setFormOpened(true)}> Add </div>
// 			<div onClick={()=>{
// 			if(currentIndex < maxIndex)
// 				mergeWordHandler(currentIndex)}}> mergeN </div>
// 			<div onClick={moveNextWord}> Next </div>
// 		</div>
// 	)
// }
// export default Auxbar1