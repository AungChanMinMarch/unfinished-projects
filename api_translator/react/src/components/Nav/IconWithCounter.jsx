import React from "react"

import './IconWithCounter.css'

const IconWithCounter = ({counter, iconLink})=>{
	return (
		<div className='IconWithCounter'>
			<img src={iconLink} alt="This is an icon" />
			{
				counter > 0 &&
				<div className='counter-container'>
					<span className='counter'>{counter}</span>
				</div>
			}
		</div>
	)
}
export default IconWithCounter