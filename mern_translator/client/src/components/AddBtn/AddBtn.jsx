import React from "react"
import ReactDOM from "react-dom"
import {Link} from "react-router-dom"

import './AddBtn.css'

const AddBtn = ()=>{
	return (
		<Link to="/addnovel" className="addBtn">Add </Link>
	)
}
export default AddBtn