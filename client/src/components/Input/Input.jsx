import React from "react"
import ReactDOM from "react-dom"

import './Input.css'

const Input = ()=>{
	return (
		<>
			<label htmlFor="name">Name</label>
			<input type="text" id="name" />
		</>
	)
}
export default Input