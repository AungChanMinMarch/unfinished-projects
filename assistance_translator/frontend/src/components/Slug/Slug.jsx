import React from "react"
import { Link } from "react-router-dom"

import {client} from '@app/sanity_client'
import './Slug.css'

const Slug = ({text, type, id, setter})=>{
	const updateView = (deletedId)=>{
    	setter(prev => prev.filter(item => item._id != deletedId))
    }
	const del = ()=>{
		client.delete(id)
			.then(() => updateView(id))
			.catch(err => console.log(err))
	}
	return (
		<div className="slug">
			<Link to={`/${type}/${id}`}>{text}</Link>
			<div onClick ={del}>Delete</div>
		</div>
	)
}
export default Slug