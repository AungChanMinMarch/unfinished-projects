import React from "react"
import {useParams } from "react-router-dom"

import {Input, InputFooter} from '@app/components'

import { searchUsers, invite, addEditor } from "@app/actions"
import { inviteTypes} from '@app/constants.js'
import './Invite.css'
import UserSlug from './UserSlug.jsx'
const initialUsers = null;
const Invite = ({ respondents, setRespondents, setter })=>{
	const { novelId } = useParams();
	const [email, setEmail] = React.useState('');
	const [users, setUsers] = React.useState(initialUsers);
	const addToRespodents = (user)=>{
		if(respondents){
			setRespondents(prev => {
				if(prev.indexOf(user) === -1)
					return  [...prev, user]
			})
		}else addEditor(novelId, user)
	}
	const removeFromRespodents = (user)=>{
		if(respondents){
			setRespondents(prev => prev.filter(item => item!=user))
		}
	}
	return (
		<div className="Invite">
			<div className="Input">
				<label htmlFor='email'>Email Address</label>
				<input 
					type='email'
					id='email' 
					value={email}
					placeholder='enter Email address to find users'
					onChange={e => setEmail(e.target.value)}/>
				<button onClick={()=>searchUsers(email, setUsers)}>Search</button>
				<button onClick={()=>setter(false)}>Done</button>
			</div>
			{
				respondents?.length > 0 &&
				respondents.map(respondent => (
					<UserSlug
						onClick={()=>removeFromRespodents(respondent)}
						key={respondent._id}
						user={respondent}
						text="Don't ask him"
					/>
				))
			}
			{
				users !== initialUsers &&
				(users.length === 0 
					? <div>There is no user. Please ender another email.</div>
					: users.map(user => (
						<UserSlug
							onClick={()=>addToRespodents(user)}
							key={user._id}
							user={user}
							text='ask him'
						/>
						))
				)
			}
		</div>
	)
}
export default Invite