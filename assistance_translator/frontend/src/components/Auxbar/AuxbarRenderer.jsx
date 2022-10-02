import React from "react"
import './Auxbar.css'

const AuxbarRenderer = ({
	moveUp, moveDown, merge, del, add, ok, cancel
})=>{
	return (
		<div className="auxbar flexbar">
			<div onClick={moveUp}> Prev </div>
			<div onClick={()=>merge('up')}> merge P</div>
			{del
				? <div onClick={del}> Delete </div>
				: <div onClick={cancel}> Cancel </div>
			}
			{add
				? <div onClick={add}> Add </div>
				: <div onClick={ok}> Ok </div>
			}
			<div onClick={()=> merge('down')}> merge N </div>
			<div
				onClick={moveDown}
			> Next </div>
		</div>
	)
}
export default AuxbarRenderer