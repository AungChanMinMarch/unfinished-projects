import React from "react"
import { GoogleLogin } from "react-google-login"
import { useNavigate } from 'react-router-dom'

import './Auth.css'

const Auth = ()=>{
	const navigate = useNavigate();

	const googleLoginSuccess =()=>{
		console.log('success')
	}

	const fail = (){
		console.log('fail')
	}
	return (
		<div><h2>
			Please Login to use our app
		</h2>
		<GoogleLogin 
            clientId = "299794166826-0qu4u91vnp769qe3pb6mkbk7vsrulac1.apps.googleusercontent.com"
            buttonText = "Login with Google"
            onSuccess = {googleLoginSuccess}
            onFailure = {fail}
            cookiePolicy = 'single_host_origin'
		/>
		</div>
	)
}
export default Auth