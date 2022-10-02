import React from "react"

import './Loading.css'

const Loading = ({description})=>{
	return (
		<div className="Loading">
			<div className="loader"></div>
			<div>{description}</div>
		</div>
	)
}
export default Loading