import React from "react"
import ReactDOM from "react-dom"
import {Link, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux'

import * as actionType from '../../constants/actionTypes';

import './Navbar.css'

export default function Navbar() {
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation()
        const dispatch = useDispatch()
    const logout = ()=>{
        dispatch({ type: actionType.LOGOUT });
        setUser(null)
    }
    React.useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    console.log(user)
    return (
        <div className="Navbar">
        {
            user
                ?<div onClick={logout}>Log Out</div>
                :<Link to="/auth"> Sign In
                </Link>
        }
        </div>
    )
}