import React from "react"

const InputFooter = ({ok})=>{
	return (
		<div className="fbox fw">
			<button onClick={()=>history.back()}>Cancel</button>
			<button onClick={ok}>OK</button>
		</div>
	)
}
export default InputFooter