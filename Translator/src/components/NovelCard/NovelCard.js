import React from "react"
import ReactDOM from "react-dom"

import './NovelCard.css'

export default function NovelCard({
    novel
}) {
    return (
        <div>{novel.name}</div>
    )
}