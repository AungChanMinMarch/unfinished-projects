import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from "react-redux"

import './App.css'
import { Auth, 
    Novels, Chapters,
    Profile, 
    Questions, AddQuestion,
    Quizzes, 
    Notifications, 
    Invites, AddNovel, Chapter, AddChapter, Invite } from '@app/views'
import { Nav, Loading } from '@app/components'

//no turn back after invite (add editor) yet

const App = ()=>{
    const isAuth = useSelector(state => state.isAuth);
    const isLoading = useSelector(state => state.isLoading);;
    if(!isAuth){
        return <Auth />
    }
    else if(isLoading.state){
        return <Loading description={isLoading.description} />
    }
    else return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Novels />} />
                
                <Route path="/novel" element={<Novels />} />
                <Route path="/novel/:novelId" element={<Chapters />} />
                <Route path="/novel/add" element={<AddNovel/>} />
                <Route path="/novel/chapter/:chapterId" element={<Chapter />} />
                <Route path="/novel/:novelId/:chapterId" element={<Chapter />} />
                <Route path="/novel/:novelId/add" element={<AddChapter />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/notification" element={<Notifications />} />
                
                <Route path="/question" element={<Questions />} />
                <Route path="/question/add" element={<AddQuestion />} />
                
                <Route path="/quiz" element={<Quizzes />} />
                
                <Route path="/invite" element={<Invites />} />
                <Route path="/invite/:novelId" element={<Invite/>} />

            </Routes>
        </BrowserRouter>
    )
}
export default App