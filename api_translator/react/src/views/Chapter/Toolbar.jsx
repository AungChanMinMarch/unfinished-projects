import React from "react"
import { useSelector, useDispatch } from 'react-redux'

import {tools} from '@app/constants'
import {setTool} from '@app/actions'

const Toolbar = ({backup, setbackup})=>{
	const activeTool = useSelector(state => state.activeTool);
	const dispatch = useDispatch();
	return (
		<div className='Toolbar fbox'>{
			tools.map((tool, index) => (
				<div
					key={tool}
					className={`tool ${tool == activeTool && 'active'}`}
					onClick={()=> {
						// if(backup.current) {
						// 	alert('please click ok or cancel')
						// 	return;
						// }

						// if(activeTool == tool){
						// 	dispatch(setTool(null));
						// 	return
						// }
						// if(index == 2){
						// 	setbackup()
						// }
						dispatch(setTool(tool))
					}}
				>
					{tool}
				</div>
			))
		}</div>
	)
}
export default Toolbar