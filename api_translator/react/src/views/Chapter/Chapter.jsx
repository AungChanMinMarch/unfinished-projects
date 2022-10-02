import React from "react"
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadSentences} from '@app/actions'

import Mobile from './Mobile.jsx'
import Desktop from './Desktop.jsx'

const Chapter = ()=>{
	const isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/));
	// const isMobile = 'ontouchstart' in document.documentElement;

	const {novelId, chapterId} = useParams();
	const dispatch = useDispatch();

	React.useEffect(()=>{
		loadSentences(novelId, chapterId)
	}, [dispatch]);
	
	return isMobile ? <Mobile className='view'/> : <Desktop className='view'/>
}
export default Chapter