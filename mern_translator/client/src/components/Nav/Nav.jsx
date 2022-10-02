import React from "react"
import ReactDOM from "react-dom"

import './Nav.css'

const Navbar = ({isLogin})=>{
	return (
		<nav>
			<div className="brandBox">Assistance Translator</div>
			{isLogin && <div>LOG OUT</div>}
		</nav>
	)
}
export default Navbar