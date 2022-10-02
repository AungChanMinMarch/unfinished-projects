import React from "react"

import { getInvites, acceptEditor } from '@app/actions'

import './Invites.css'
import { NovelSlug } from "@app/components"

const Invites = ()=>{
	const [invites, setInvites] = React.useState([])
	const fetchHandler = (value)=>setInvites(value);
	const reHandler = (id)=> setInvites(prev => prev.filter(invite=> invite._id !== id))
	React.useEffect(()=>{
		getInvites(fetchHandler)
	}, []);
	function handler(e){
		e.stopPropagation();
		e.preventDefault();
	}
	function acceptHandler(e, inviteId){
		handler(e);
		acceptEditor(inviteId, (id)=> setInvites(prevInvites => prevInvites.map(invite => invite._id == id ? {...invite, state: 'accepted'}:invite)))
	}
	console.log(invites);
	return (
		<div className='Invites'>
			<details open>
				<summary>You Got Invited</summary>
				{
					invites.map(invite=>(
						<NovelSlug
							id={invite._id}
							key={invite._id}
							novel={invite.novel}
						>
						{invite.state === 'requested'
							? <>
							<button onClick={(e)=>acceptHandler(e, invite._id)}>Accept</button>
							<button>Reject</button>
							</>
							: <h3>Accepted</h3>
						}
						</NovelSlug>
					))
				}
			</details>
		</div>
	)
}
export default Invites