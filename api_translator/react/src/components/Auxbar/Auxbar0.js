// import React from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useParams } from 'react-router-dom'

// import { prevSentence, nextSentence, deleteSentence, addSentence, mergeSentence } from "@app/actions"
// import AddForm  from './AddForm.js'
// import {activeSentence_Selector, sentence_id_Selector} from '@app/redux/selectors.js'
// // import {SocketContext} from '@app/views/chapter.js'
// const Auxbar0 = ()=>{
// 	const dispatch = useDispatch();

// 	const [fromOpened, setFormOpened] = React.useState(false);
// 	// const socket = React.useContext(SocketContext)
// 	const currentIndex = useSelector(activeSentence_Selector)
// 	const minIndex = 0;
// 	const maxIndex = useSelector(state => state.sentences.length -1) //maxIndex => length starts with 1 and index starts with 0. So -1

// 	const sentence_id = useSelector(sentence_id_Selector)
// 	const {chapterId} = useParams();
// 	React.useEffect(()=>{
// 		if(currentIndex > maxIndex) movePrevSentence();
// 	}, [maxIndex])
// 	const movePrevSentence = ()=>{
// 		if(currentIndex > minIndex) dispatch(prevSentence(minIndex));
// 	}
// 	const moveNextSentence = ()=>{
// 		if(currentIndex < maxIndex) dispatch(nextSentence(maxIndex))
// 	}
// 	React.useEffect(()=>{
// 		// socket.on('WORD_DELETED', (sentence_id)=>{
// 		// 	console.log(sentence_id);
// 		// 	dispatch(deleteSentence(sentence_id))
// 		// })
// 		// return function(){socket.removeAllListeners()}
// 	}, [])
// 	const deleteSentenceHandler = ()=>{

// 		// clientSocket.DELETE_SENTENCE(chapterId, sentence_id)
// 		// socket.emit('DELETE_WORD', {chapter_id: chapterId, sentence_id : sentence_id});
// 	}
// 	const addSentenceHandler = (input, addPlace)=>{
// 		const index = addPlace == 'before' ? currentIndex : currentIndex + 1;
// 		dispatch(addSentence(input, index))
// 	}
// 	const mergeSentenceHandler = (index)=>{
// 		dispatch(mergeSentence(index))
// 	}
// 	return (
// 		<div className="auxbar small-auxbar fbox">
// 			{fromOpened && <AddForm setter={setFormOpened} addNow={addSentenceHandler} />}
// 			<div onClick={movePrevSentence}> Prev </div>
// 			<div onClick={()=>{
// 				if(currentIndex > 0){ 
// 					mergeSentenceHandler(currentIndex -1);
// 					movePrevSentence()
// 				}
// 			}}> mergeP</div>
// 			<div onClick={deleteSentenceHandler}> Delete </div>
// 			<div onClick={()=>setFormOpened(true)}> Add </div>
// 			<div onClick={()=>{
// 			if(currentIndex < maxIndex)
// 				mergeSentenceHandler(currentIndex)}}> mergeN </div>
// 			<div onClick={moveNextSentence}> Next </div>
// 		</div>
// 	)
// }
// export default Auxbar0