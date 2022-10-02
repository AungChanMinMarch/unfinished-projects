import React from "react"
import ReactDOM from "react-dom"

import './Input.css'

const Input = ({ name, state , change, type })=>{
	return (
		<div className="textInput">
			<label htmlFor={name}>{name}</label>
			<input
				required = {true}
				type={type || 'text'}
				id={name}
				onChange={
					e=>change(
						prevState => ({...prevState,[name]: e.target.value})
					)
				} 
				value={state[name]}/>
		</div>
	)
}
export default Input