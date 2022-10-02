import React from "react"
import { useNavigate } from 'react-router-dom'

import './Notifications.css'
import { getNotis } from '@app/actions'

const NotiSlug = ({ noti })=>{
	const navigate = useNavigate();
	function clickHandler(){
		// send http put request to change read to true
		if(noti.referenceType === "Invite")
		navigate(`/invites#${noti.reference}`)
	}
	return(
		<div onClick={clickHandler} className='NotiSlug slug'>
			<span className="senderName"> {noti.sender?.name}</span>
			<span className="senderEmail">({noti.sender?.email}) </span>
			<span className="message"> {noti.message}</span>
		</div>
	)
}
const Notifications = ()=>{
	const [notis, setNotis] = React.useState([])
	React.useEffect(()=>{
		getNotis(setNotis)
	}, [])
	return (
		<div className="Notifications">
			<h1 className="Notifications-header">Notifications</h1>
			{
				notis.map(noti => (
					<NotiSlug key={noti._id} noti={noti} />
				))
			}
		</div>
	)
}
export default Notifications