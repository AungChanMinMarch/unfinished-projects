import React from "react"

import './Toolbar.css'

const Toolbar = ({tools, activeTool, setActiveTool,backup, setbackup})=>{
	const toolEls = tools.map((tool, index) => (
			<div
				key={tool}
				className={`tool ${tool == activeTool ? 'active' : ''}`}
				onClick={()=> {
					if(activeTool == tool) return;
					if(backup.current.isOk) {
						if(index == 2){
							setbackup();
						}
						setActiveTool(tool);
					}else alert('please click ok or cancel')
				}}
			>
				{tool}
			</div>
		))
	
	return (
		<div className='toolsbar flexbar'>{toolEls}</div>
	)
}
export default Toolbar