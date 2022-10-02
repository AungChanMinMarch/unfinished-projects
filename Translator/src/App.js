import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'

import Auth from "./views/Auth/Auth"
import Main from "./views/Main/Main"
import Novel from "./views/Novel/Novel"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/novel" element={<Novel />} />
            </Routes>
        </BrowserRouter>
    )
}
