import React from "react"

import { useDispatch } from 'react-redux'

import { signOut } from '@app/actions/auth.js'
import './Profile.css'

const Profile = ()=>{
	const dispatch = useDispatch()
	return (
		<div>
			<h1>Novels,</h1>
			<h1>Questions you asked,</h1>
			<h1>Questions that others asked you,</h1>
			<h1>Notifications</h1>
			<h1> Dictionary</h1>
			<button onClick={()=>dispatch(signOut)}>LOG OUT</button>
		</div>
	)
}
export default Profile