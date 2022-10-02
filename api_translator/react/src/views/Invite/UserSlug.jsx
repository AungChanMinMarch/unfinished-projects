import React from "react"

import './UserSlug.css'

const UserSlug = ({ user, onClick, text })=>{
	return (
		<div className="UserSlug">
			<img 
				className="UserSlug-img"
				src={user.imgUrl || "/profile.svg"} 
				alt="user photo"
			/>
			<div className="UserSlug-box">
				<h3 className="UserSlug-name">{user.name}</h3>
				<h4 className="UserSlug-email">{user.email}</h4>
			</div>
			<button 
				className="UserSlug-btn" 
				onClick={onClick}
				// onClick={()=>addEditor(novelId, user)}
			>{text || 'ADD EDITOR'}</button>
		</div>
	)
}
export default UserSlug