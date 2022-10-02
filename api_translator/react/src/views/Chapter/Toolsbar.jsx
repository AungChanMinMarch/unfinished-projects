import React from "react"
import { useParams } from "react-router-dom"

import { SocketContext } from "@app/context/socket.js"
import { moveSentence, mergeSentence, updateSentence } from '@app/actions'

const Toolsbar = ({ setter })=>{
	const socket = React.useContext(SocketContext)
    const { chapterId } = useParams();

    const moveSentenceHandler = (step)=>{
    	moveSentence(step).then((res)=>{
    		socket.emit('update', {
                chapterId: chapterId,
                index: res.index,
                newSentence: res.input
            }, ()=>{
                updateSentence(res.index, res.input)
            })
    	})
    }
    const moveNextSentence = ()=> moveSentenceHandler(1)
    const movePrevSentence = ()=> moveSentenceHandler(-1)
    const ask =()=>{
        setter(true)
    }
    
	const handler = React.useCallback(e=>{
        if(e.shiftKey === true){
            // if(e.key === "n") nextSentence()
        }
        else if(e.altKey === true){
            e.preventDefault();
            if(e.key === "p") movePrevSentence()
            if(e.key === "n") moveNextSentence()
        }
    })
    React.useEffect(()=>{
        document.addEventListener('keydown', handler);
        return ()=>{
            document.removeEventListener('keydown', handler)
        }
    }, []);
	return (
		<div className='Toolsbar'>
			<img src="/tool/left.svg" onClick={movePrevSentence} alt="Move Left" />
			<img src="/tool/skip_prev.svg" onClick={mergeSentence} alt="Merge Left" />
			<img src="/tool/add.svg" alt="add" />
			<img src="/tool/delete.svg" alt="delete" />
			<img src="/tool/skip_next.svg" alt="Merge Right" />
            <img src="/tool/right.svg" onClick={moveNextSentence} alt="Move Right" />
			<img src="/tool/addQuestion.png" onClick={ask} alt="Move Right" />
		</div>
	)
}
export default Toolsbar
// const Toolsbar = ({tools})=>{
// 	return (
// 		<div className='Toolsbar'>
// 			{tools?.map(tool => (
// 				<img 
// 					key={tool.url}
// 					src={tool.url}
// 					style={tool.style}
// 					onClick={tool.onClick}
// 				/>
// 			))}
// 		</div>
// 	)
// }