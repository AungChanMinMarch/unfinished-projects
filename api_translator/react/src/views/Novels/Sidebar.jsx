import React from "react"

import './Sidebar.css'

const Sidebar = ()=>{
	const team = {
		_id: '1234',
		name: 'Khant Chaw',
		admin: {
			name: 'ACM',
			email: 'aungchanminmarch@gmail.com'
		},
	}
	return (
		<div className='Sidebar'>
			<button>Create a new TEAM</button>
			<div>Khat chaw</div>
			<ul>
				<li>Novels</li>
				<li>add members</li>
				<li>Notifications</li>
				<li>Settings(e.g. privacy: public, private,... anyone with link can join/only admin can invite others)</li>
				<li>team profile page</li>
			</ul>
		</div>
	)
}
export default Sidebar