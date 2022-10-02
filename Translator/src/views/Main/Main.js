import React from "react"
import ReactDOM from "react-dom"
import { useDispatch } from 'react-redux'

import './Main.css'
import Navbar from '../../components/Navbar/Navbar.js'
import NovelCard from '../../components/NovelCard/NovelCard.js'
export default function Main() {
    
    return (
        <div>
            <Navbar/>
            novels          
        </div>
    )
}
// user.novels.map(novel =>
                //     (
                //         <Link key={novel.id} to="/novel">
                //             <NovelCard  novel={novel}/>
                //         </Link>
                //     )
                // )