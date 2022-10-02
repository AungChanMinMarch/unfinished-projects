import React from "react"
import { GoogleLogin } from "react-google-login"
import { useNavigate } from 'react-router-dom'

import { client } from '@app/sanity_client'
import './Auth.css'
import { Navbar } from '@app/components/index.js'

const Auth = () => {
    const navigate = useNavigate();

    const googleLoginSuccess = (response) => {
    	// {googleId, imageUrl, email, name, givenName, familyName}
        const userInfo = JSON.stringify(response.profileObj)
        localStorage.setItem('user', userInfo)
        const { name, email, googleId, imageUrl} = response.profileObj;
        const userDocs = {
        	_id : googleId,
        	_type: 'user',
        	name: name,
        	email: email,
        	// img: imageUrl
        }
        console.log("login success")
        client.createIfNotExists(userDocs)
            .then(user => navigate("/"))
            .catch(err => console.log(err))
    }

    const fail = () => {
        console.log('fail')
    }
    return ( 
        <div >
            <Navbar user={false} />
            <h2>Please Login to use our app </h2>
            <GoogleLogin
                clientId = "299794166826-0qu4u91vnp769qe3pb6mkbk7vsrulac1.apps.googleusercontent.com"
                buttonText = "Login with Google"
                onSuccess = { googleLoginSuccess }
                onFailure = { fail }
                cookiePolicy = 'single_host_origin'
            />
        </div>
    )
}
export default Auth