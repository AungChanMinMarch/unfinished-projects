import React from "react"

// import {socket, SocketContext} from '@app/socket.js'

import {tools} from'@app/constants'
import Aux0 from './Auxbar0.js'
import Aux1 from './Auxbar1.js'
import Aux2 from './Auxbar2.js'
import Aux3 from './Auxbar3.js'
import Aux4 from './Auxbar4.js'
import Aux5 from './Auxbar5.js'

export default ({activeTool, backup})=>{
	// const getAux = ()=>{
		switch(activeTool){
		case tools[0]:
			return <Aux0 />
		case tools[1]:
			return <Aux1 />
		case tools[2]:
			return <Aux2 backup={backup}/>
		case tools[3]:
			return <Aux3 />
		case tools[4]:
			return <Aux4 />
		case tools[5]:
			return <Aux5 />
		default:
			<></>
			alert(`something wrong with Auxbar. activeTool:${activeTool} is not one of the tools`)
		}
	// }
	// return (
	// 	<SocketContext.Provider value={socket}>
	// 		{
	// 			getAux()
	// 		}
	// 	</SocketContext.Provider>
	// )
}