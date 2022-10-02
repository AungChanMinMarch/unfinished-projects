import React from "react"
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Auxbar} from '@app/components'
import Toolbar from './Toolbar.jsx'
import {getChapter} from '@app/actions'
import {tools} from '@app/constants.js'
import {upSentence, setSentences , loadSentences} from '@app/actions'

import EngScreen from './EngScreen.jsx'
// need to reset active word after changing active sentence

const Mobile = ()=>{
	const renderCounter = React.useRef(0);
	renderCounter.current += 1;
	console.log(`This chapter page has rendered ${renderCounter.current} times`);

	const {novelId, chapterId} = useParams();
	const dispatch = useDispatch();
	const location = useLocation();

	const chapter = React.useRef();
	const sentences = useSelector(state => state.sentences)
	const backup = React.useRef(null);
	const setbackup = () => {
		backup.current = sentences
	}
	const activeTool = useSelector(state => state.activeTool);
	const activeSentence = useSelector(state => state.activeSentence);
	const activeWord = useSelector(state => state.activeWord);

	const [addForm, setAddForm] = React.useState(null);
	// const saveToApp = (obj)=>{
	// 	const {sentences: resSentences , ...resChapter} = obj
	// 	chapter.current = resChapter
	// 	dispatch(setSentences(resSentences))
	// }
	React.useEffect(()=>{
		dispatch(loadSentences(novelId, chapterId))
	}, [dispatch])
	// React.useEffect(()=>{
	// 	// loadChapterForAndroid(novelId, chapterId)
	// 	if(location.state){
	// 		console.log("novel is recently created. No need to request to server");+

	// 		saveToApp(location.state)
	// 		return;
	// 	}
	// 	const token = localStorage.getItem('token')
	// 	// navigate to auth if no token ro no valid token
	// 	getChapter(token, chapterId, novelId).then((res)=>{
	// 		console.log(res);
	// 		saveToApp(res.data.novel);
	// 	})
	// }, [])

	return (
		<div className="chapter">
			<div className={`page ${!activeTool ? "" : tools.indexOf(activeTool) <= 2 ? "large" : "small"}`}>
		 		<EngScreen />
		 	</div>
			{activeTool && 
					<Auxbar activeTool={activeTool} backup={backup}/>			}
			
			<Toolbar 
				backup={backup} 
				setbackup = {setbackup}
			/>
		</div>
	)
}
// {sentences && <Auxbar 
// 				category={category} setCategory={setCategory}
// 				tokens={tokens} setTokens={setTokens}
// 							activeTool={activeTool} setActiveTool={setActiveTool}
// 							sentences={sentences} setSentences={setSentences}
// 							activeSentence={activeSentence} setActiveSentence={setActiveSentence}
// 							activeWord={activeWord} setActiveWord={setActiveWord}
// 							addForm={addForm} setAddForm={setAddForm}
// 							backup={backup} 
// 						/>}
// {addForm == constants.sentence && <Add setter={setAddForm} addNow={addSentence} />}
// 			{addForm == constants.word && <Add setter={setAddForm} addNow={addWord} />}
export default Mobile

// after changing active sentence, reset active word to 0

// import {Add, Toolbar, Auxbar} from '@app/components'

	// const [category, setCategory] = React.useState();
	// const [tokens, setTokens] = React.useState();
	
	
	// const insert = (array, index, value) => [...array.slice(0, index), value, ...array.slice(index)];
	// const addSentence = (newInput, beforeOrAfter)=>{
	// 	const index = beforeOrAfter == "before" ? activeSentence : 1+activeSentence;
	// 	const newSentence = {
	// 		// _type: 'sentence',
	// 		_key: generateId(),
	// 		eng: newInput.split(" ").map(word => ({
	// 			word: word,
	// 			dict_code:0,
	// 			_key: generateId()})),
	// 		mm:""
	// 	}
	// 	setSentences(prevSentences => insert(prevSentences, index, newSentence))
	// }
	// const addWord = (newInput, beforeOrAfter)=>{
	// 	const indexWord = beforeOrAfter == "before" ? activeWord : 1+activeWord;
	// 	const newWord = {word: newInput, dict_code: 0, _key: generateId()}
	// 	setSentences(prevSentences => prevSentences.map((sentence, index)=> index != activeSentence ? sentence : {...sentence, eng:insert(sentence.eng, indexWord, newWord)}))
	// }

		
	
