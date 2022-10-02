import React from "react"
import { NavLink, useLocation } from 'react-router-dom'
import { get_notis, count_unread_notis } from '@app/redux/selectors'
import { getSummaryNotis } from "@app/actions"
import './Nav.css'
import IconWithCounter from './IconWithCounter.jsx'

const Nav = ()=>{
    const [counter, setCounter] = React.useState(0);
    const location = useLocation()
	React.useEffect(()=>{
		getSummaryNotis(setCounter)
	}, [])

	return (
		<nav className="fbox">
			<div className="brandBox">Assistance Translator</div>
			<NavLink 
				to='/' 
				className={location.pathname.indexOf('novel') > -1 && "active"}
			>
				<img src="/novels.svg" alt="novels" />
			</NavLink>
			<NavLink to='/question'>
				<IconWithCounter 
					counter={counter.questions} 
					iconLink='/questions.svg'
				/>
			</NavLink>
			<NavLink to='/quiz'>
				<IconWithCounter 
					counter={counter.quizzes} 
					iconLink='/quizzes.svg' 
				/>
			</NavLink>
			<NavLink to='/invite'>
				<IconWithCounter 
					counter={counter.invites} 
					iconLink='/addPerson.svg' 
				/>
			</NavLink>
			<NavLink to='/notification' className='notifications'>
				<IconWithCounter 
					counter={counter.notis} 
					iconLink='/notifications.svg' 
				/>
			</NavLink>
			<NavLink to='/profile'>
				<img src="/profile.svg" alt="profile picture" />
			</NavLink>
		</nav>
	)
}
export default Nav
				// {openNoti && 
				// 	<div className='notifications-container'>
				// 		<h2 className='notifications-header'>
				// 			Notifications
				// 		</h2>
				// 		<hr className='notifications-hr'/>
				// 		<div className='notifications-body'>
				// 			{notis.length === 0 ? 'no notifications' :
				// 				notis.map(noti =>(
				// 				<div key={noti._id}>{noti.senderName}({noti.senderEmail}) {noti.message}</div>								
				// 			))}
				// 		</div>
				// 	</div>
				// }