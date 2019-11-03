import React from 'react'
import './Header.css'

export default function Header() {
    return (
        <header className="main-header">
            <span className="back-wrapper"><a className="back-button" href="/"><i className="fas fa-arrow-left fa-lg"></i></a></span>
            <div className="logo">
                <a href="/"><img src="logo.svg" alt="temp"></img></a>
            </div>
        </header>
    )
}
