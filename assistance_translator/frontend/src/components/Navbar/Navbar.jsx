import React from "react"
import ReactDOM from "react-dom"

import './Navbar.css'

const Navbar = ({isLogin, setUser})=>{
	const logout = ()=>{
		localStorage.clear();
		setUser(null)
	}
	return (
		<nav>
			<div className="brandBox">Assistance Translator</div>
			{isLogin && <div className="logout" onClick={logout}>LOG OUT</div>}
		</nav>
	)
}
export default Navbar