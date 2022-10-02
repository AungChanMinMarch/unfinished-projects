import React from "react"
import {Link} from "react-router-dom"
// this component will become two componts: novel Slug, Chapter Slug
const Slug = ({obj, to, deleteHandler})=>{
	return (
		<div className="slug fbox">
			<Link to={to}>
			hi
			</Link>
			<span className="delete" onClick={deleteHandler}>Delete</span>
		</div>
	)
}
export default Slug