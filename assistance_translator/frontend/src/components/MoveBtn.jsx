import React from "react"

const MoveBtn = ({text, func})=>{
	return (
		<button onClick={func}>{text}</button>
	)
}
export default MoveBtn