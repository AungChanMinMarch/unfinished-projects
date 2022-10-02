import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import { Home, Auth, Novel, AddNovel, Chapter, AddChapter } from '@app/views/index.js'
// import { getNovels } from './actions/novels'

const App = ()=>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="addnovel/" element={<AddNovel />} />
                <Route path="addchapter/:novelId" element={<AddChapter />} />
                <Route path="novel/:novelId" element={<Novel />} />
                <Route path="chapter/:chapterId" element={<Chapter />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App