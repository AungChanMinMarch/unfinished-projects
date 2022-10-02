import React from "react"

import './Translatebar.css'
import {client} from '@app/sanity_client'
import {Input} from '@app/components'
import constants from '@app/utils/constants'

const initialForm = {partOfSpeech: '', meaning: ''}
const Translatebar = ({
	category, setCategory,
	tokens, setTokens,
	moveUp, moveDown, word})=>{
	const [addForm, setAddForm] = React.useState();
	const [form, setForm] = React.useState(initialForm);

	React.useEffect(()=>{
		console.log(search(word.word));
	})
	const search =(searchWord)=>{
		console.log(tokens);
		for(let i=0; i<tokens.length; i++){
			if(tokens[i].spelling == searchWord)
				return tokens[i]
		}
	}
	const cancel = ()=>{
		setAddForm(null)
		setForm(initialForm)
	}
	const addMeaning = ()=>{
		console.log(form);
		// console.log(meanings);
		console.log(category);
		// const newMeaning ={
		// 	eng: word,
		// 	meanings: [
		// 	{
		// 		category: 
		// 	}
		// 	]
		// }
	}
	const askMeaning=()=>{
		console.log('asking');
	}
	return (
		<div className="translatebar">
			<div className="flexbar">
				<div onClick={moveUp}>P</div>
				<div className='translatebar-word'>{word.word}</div>
				<div onClick={moveDown}>N</div>
			</div>
			<div className='translatebar-body'>
				<div className='translatebar-meanings'>
					<div 
						className="translateAdd"
						onClick={()=>setAddForm(constants.meaning)}
					>Add</div>
				</div>

				<div className='translatebar-helper'>
					<div className="translateAdd">Add</div>
				</div>
			</div>
			{addForm == constants.meaning && <div className="addMeaningForm flexCol">
				<div>
					<label htmlFor="partOfSpeech">Part of Speech</label>
					<select id="partOfSpeech" 
						onChange={e=> setForm(prev => ({...prev, partOfSpeech: e.target.value}))}>
						{category.map(cat => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
					</select>
				</div>	
				<Input name="meaning" state={form} change={setForm} />
				<button onClick={addMeaning}>OK</button>
				<button onClick={cancel}>Cancel</button>
				<button onClick={askMeaning}>Ask</button>
			</div>}
		</div>
	)
}
export default Translatebar