import React from "react"

import './Auxbar.css'
import AuxbarRenderer from './AuxbarRenderer.jsx'
import Translatebar from './Translatebar.jsx'
import constants from '@app/utils/constants.js'
import generateId from '@app/utils/generateId.js'
const Auxbar = ({
	category, setCategory,
	tokens, setTokens,
	activeTool, setActiveTool,
	sentences, setSentences,
	activeSentence, setActiveSentence,
	activeWord, setActiveWord,
	addForm, setAddForm,
	backup
	})=>{
	const getMergevars = (upOrdown, state)=>{
		return upOrdown == "up" ? [state - 1, state] : [state, state+1]
	}
	const wordsLength=()=>{
		return sentences[activeSentence].eng.length
	}
	const moveUp = (state, setState)=>{
		return ()=> {if(state==0) return;
		setState(prev=> prev-1);}
	}
	const moveDown = (state, setState, max)=>{
		return ()=>{
			if(state==max-1) return;
			setState(prev=> prev+1);
		}
	}

	const deleteSentence = ()=>{
		setSentences(prevSentences => prevSentences.filter((item, index)=> index != activeSentence))
		const max = sentences.length - 2;//even though I have use setSentences, some how it returns before deleting values. So I use - 2 instead of -1
		if(activeSentence > max) setActiveSentence(max)
	}
	const mergeSentence =  ( upOrdown )=>{
		if( upOrdown == "up" && activeSentence == 0) return;
		if( upOrdown == "down" && activeSentence == sentences.length -1) return;
		const [first, second] = getMergevars(upOrdown, activeSentence)

		let obj = {};
		obj.eng = sentences[first].eng.concat(sentences[second].eng);
		obj.mm = sentences[first].mm + sentences[second].mm;
		obj._key = sentences[first]._key;
		setSentences(prevSentences => {
			const removed = prevSentences.filter((item, index) => index != second)
			const merged = removed.map((item, index) => index == first ? obj : item)
			return merged;
		});
		if(activeSentence != first) setActiveSentence(first)
	}
	
	if(activeTool == constants.tools[0])
		return <AuxbarRenderer
				moveUp={moveUp(activeSentence, setActiveSentence)}
				moveDown={moveDown(activeSentence, setActiveSentence, sentences.length)}
				state={activeSentence} 
				setState={setActiveSentence} 
				max={sentences.length}
				merge={mergeSentence}
				del={deleteSentence} 
				add={()=>setAddForm(constants.sentence)}
			/>
	
	const deleteWord = ()=>{
		setSentences(prevSentences => prevSentences.map((sentence, index)=>(index != activeSentence ? sentence : {...sentence, eng: sentence.eng.filter((word, i)=>i!=activeWord)})))
		const max = wordsLength() - 2;
		if (activeWord > max) setActiveWord(max);
		if(wordsLength() == 1) {
			deleteSentence();
			setActiveWord(0);//this may solve after deleting word => delete sentence ===> missing acitve word && active appears again after clicking next
		}
	}
	const mergeWord = ( upOrdown )=>{
		if( upOrdown == "up" && activeWord == 0) return;
		if( upOrdown == "down" && activeWord == wordsLength() - 1) return;
		const [first, second] = getMergevars(upOrdown, activeWord);

		let obj = {};
		const parentObj = sentences[activeSentence].eng
		obj._key = parentObj[first]._key
		obj.word = parentObj[first].word +" " + parentObj[second].word;
		obj.dict_code = 0;

		const removedEngSentence = parentObj.filter((item, index) => index != second)
		const mergedEngSentence = removedEngSentence.map((item, index) => index == first ? obj : item)

		setSentences(prevSentences => prevSentences.map((sentence, index)=>(index != activeSentence ? sentence :  {...sentence, eng: mergedEngSentence})))
		if(activeWord != first) setActiveWord(first)
	}
	if(activeTool == constants.tools[1])
		return <AuxbarRenderer
				moveUp={moveUp(activeWord, setActiveWord)}
				moveDown={moveDown(activeWord, setActiveWord, wordsLength())}
				merge={mergeWord}
				del={deleteWord} 
				add={()=>setAddForm(constants.word)}
			/>
	
	const breakup = ()=>{
		backup.current = {isOk: true, data: ""}
		setActiveTool(null)
		setSentences(prevSentences =>{
			const before = prevSentences.slice(0, activeSentence);
			const after = prevSentences.slice(activeSentence+1)
			const breakedupSentences = prevSentences[activeSentence].eng;
			let arr = []
			for(let i=0; i < breakedupSentences.length; i++){
				arr.push({
					eng: breakedupSentences[i].word.split(" ").map(word => ({
						word: word,
						code: 0,
						_key: generateId()
					})), 
					mm: '', 
					_key: breakedupSentences[i]._key
				})
			}
			return [...before, ...arr, ...after]
		})
	}
	const nobreakup = ()=>{
		setSentences(backup.current.data);
		backup.current = {isOk: true, data: ""}
		setActiveTool(null)
	}
	if(activeTool == constants.tools[2])
		return <AuxbarRenderer
				moveUp={moveUp(activeWord, setActiveWord)}
				moveDown={moveDown(activeWord, setActiveWord, wordsLength())}
				merge={mergeWord}
				ok={breakup} 
				cancel={nobreakup}
			/>
	
	if(activeTool == constants.tools[3]){
		let tokensArr = [];
		for(let i=0; i<sentences[activeSentence].eng; i++){
			const wordMeaning = search(sentences[activeSentence].eng[i])

		}
		return <Translatebar
			category={category} setCategory={setCategory}
			tokens={tokens} setTokens={setTokens}
			moveUp={moveUp(activeWord, setActiveWord)}
			moveDown={moveDown(activeWord, setActiveWord, wordsLength())}
			word={sentences[activeSentence].eng[activeWord]}
		/>}
}
export default Auxbar