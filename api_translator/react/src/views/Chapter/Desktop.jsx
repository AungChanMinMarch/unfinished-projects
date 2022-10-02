import React from "react"
import Split from 'react-split'
import './Desktop.css'

import Toolsbar  from './Toolsbar.jsx'
import EngScreen from './EngScreen.jsx'
import Ask  from './Ask.jsx'
import { nextSentence, prevSentence, mergeSentence } from '@app/actions'

const Desktop = ()=>{
    const [isQuestionMode, setIsQuestionMode] = React.useState(true)
	return (
        <div className='Desktop'>
            <Toolsbar setter={setIsQuestionMode}/>
            {
                isQuestionMode
                    ? <Ask />
                    : <EngScreen />
            }
        </div>
	)
}
export default Desktop
		// <Split 
  //           sizes={[45, 55]} 
  //           gutterSize={10}
  //           gutterAlign="center"
  //           snapOffset={30}
  //           dragInterval={1}
  //           direction="horizontal"
  //           cursor="col-resize"
  //           className="split"
  //       >
  //       	<Eng />
  //       	<Translate />
  //       </Split>