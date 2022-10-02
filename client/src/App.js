import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useDispatch} from 'react-redux'

import './App.css'
import { Home, Novel, AddNovel } from '@app/views/index.js'
import { getNovels } from './actions/novels'

const App = ()=>{
    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(getNovels())
    }, [dispatch])
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="novels" element={<Home />} />
                <Route path="addnovel" element={<AddNovel />} />
                <Route path="novel" element={<Novel />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App