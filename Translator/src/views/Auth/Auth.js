import React from "react"
import ReactDOM from "react-dom"
import { GoogleLogin } from "react-google-login"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './Auth.css'

export default function Auth() {
    const dispatch = useDispatch()
    const navigate = useNavigate ()

    async function success(res) {
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch({
                type: 'AUTH',
                data: { result, token }
            })
            return navigate('/');
        } catch {
            console.log('fail')
        }
    }

    function fail(err) {
        console.log(err)
    }

    return ( 
        <div >
            <GoogleLogin
                clientId = "299794166826-0qu4u91vnp769qe3pb6mkbk7vsrulac1.apps.googleusercontent.com"
                buttonText = "Login with Google"
                onSuccess = { success }
                onFailure = { fail }
                cookiePolicy = { 'single_host_origin' }
            />
        </div >
    )
}