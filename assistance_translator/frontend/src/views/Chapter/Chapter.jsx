import React from "react"
import { useParams } from 'react-router-dom'

import './Chapter.css'
import {Add, Toolbar, Auxbar} from '@app/components'
import {client } from '@app/sanity_client'
import generateId from '@app/utils/generateId'
import constants from '@app/utils/constants'
import {getBy_type_refId, categoryQuery} from '@app/utils/data'

// after changing active sentence, reset active word to 0

const Chapter = ()=>{
	const {chapterId} = useParams();
	const chapter = React.useRef();
	const backup = React.useRef({isOk : true});

	const renderCounter = React.useRef(0);
	renderCounter.current += 1;
	console.log(`This chapter page has rendered ${renderCounter.current} times`);

	const [sentences, setSentences] = React.useState();
	const [category, setCategory] = React.useState();
	const [tokens, setTokens] = React.useState();

	const [activeTool, setActiveTool] = React.useState(null);
	const [activeSentence, setActiveSentence] = React.useState(0)
	const [activeWord, setActiveWord] = React.useState(0)
	const [addForm, setAddForm] = React.useState(null);
	
	React.useEffect(()=>{
		client.getDocument(chapterId)
			.then(res => {
				console.log(res)
				const {sentences: resSentences , ...resChapter} = res
				chapter.current = resChapter
				setSentences(resSentences);
				const userInfo = localStorage.getItem('user')
				client.fetch(categoryQuery).then(resCat => setCategory(resCat))
	    		client.fetch('*[ _type == "dictionary" && references("117236106902915760497") ]').then(resDict => setTokens(resDict[0].tokens))
				
			})
			.catch(err =>{
				console.log(err)
			})
	},[])
console.log(tokens);
	React.useEffect(()=>{
		setActiveWord(0)
	}, [activeSentence])
	React.useEffect(()=>{
		console.log('second pirority');
	})
	const update = ()=>{
		client.createOrReplace({
			...chapter.current, sentences
		}).then(res => {
			console.log("updated")
		})
	}
	const setbackup = () =>{
		backup.current ={ 
			isOk : false,
			data :sentences
		}
	}
	const insert = (array, index, value) => [...array.slice(0, index), value, ...array.slice(index)];
	const addSentence = (newInput, beforeOrAfter)=>{
		const index = beforeOrAfter == "before" ? activeSentence : 1+activeSentence;
		const newSentence = {
			// _type: 'sentence',
			_key: generateId(),
			eng: newInput.split(" ").map(word => ({
				word: word,
				dict_code:0,
				_key: generateId()})),
			mm:""
		}
		setSentences(prevSentences => insert(prevSentences, index, newSentence))
	}
	const addWord = (newInput, beforeOrAfter)=>{
		const indexWord = beforeOrAfter == "before" ? activeWord : 1+activeWord;
		const newWord = {word: newInput, dict_code: 0, _key: generateId()}
		setSentences(prevSentences => prevSentences.map((sentence, index)=> index != activeSentence ? sentence : {...sentence, eng:insert(sentence.eng, indexWord, newWord)}))
	}
	return (
		<div className="chapter">
			<div className={`page ${!activeTool ? "" : 
		 constants.tools.indexOf(activeTool) <= 2 ? "large" : "small"}`}>
		  {sentences && sentences.map((sentence, index)=>{
		  	const isActive = index == activeSentence 
		  	const className = `sentence ${isActive ? "active":""}`
		  	return <div key={sentence._key} className={className}>
		  		{!isActive ? sentence.eng.map(word=><div key={word._key} className="word">{word.word}</div>)
		  		: sentence.eng.map((word, index)=>(
		  			<span key={word._key} className={`word ${index == activeWord ?
		  				"active":""}`}> {word.word} </span>
		  			))
		  	}
		  	</div>
		  	})}
		 </div>
			{addForm == constants.sentence && <Add setter={setAddForm} addNow={addSentence} />}
			{addForm == constants.word && <Add setter={setAddForm} addNow={addWord} />}
			{sentences && <Auxbar 
				category={category} setCategory={setCategory}
				tokens={tokens} setTokens={setTokens}
							activeTool={activeTool} setActiveTool={setActiveTool}
							sentences={sentences} setSentences={setSentences}
							activeSentence={activeSentence} setActiveSentence={setActiveSentence}
							activeWord={activeWord} setActiveWord={setActiveWord}
							addForm={addForm} setAddForm={setAddForm}
							backup={backup} 
						/>}
			<Toolbar 
				tools={constants.tools} 
				activeTool={activeTool} 
				setActiveTool={setActiveTool}
				backup={backup} setbackup = {setbackup}
			/>
		</div>
	)
}
export default Chapter