import React from "react"

const AddForm = ({setter, addNow})=>{
	const [input, setInput] = React.useState("")
	const [addPlace, setAddPlace] = React.useState("before")
	const changeHandler = (e)=>{
		setInput(e.target.value)
	}
	const cancel = ()=>{
		setter(null);
		setInput("");
	}
	return (
		<div className="addForm">
			<textarea 
				value={input}
				onChange={changeHandler} 
				placeholder="type here..."
			/>
			<div className='add-place'>
				<label htmlFor="addBefore">
				<input 
					type="radio" 
					name="add_place" 
					id="addBefore" 
					checked={addPlace == "before"}
					onChange={()=> setAddPlace('before')}
				/>
				Add before</label>
				<label htmlFor="addAfter">
				<input 
					type="radio" 
					name="add_place" 
					id="addAfter" 
					checked={addPlace == "after"}
					onChange={()=> setAddPlace('after')}
				/>
				Add after</label>
			</div>
			<div className="add-footer">
				<button onClick={cancel}>Cancel</button>
				<button onClick={()=>{addNow(input, addPlace); cancel();}}>Add now</button>
			</div>
		</div>
	)
}
export default AddForm