import React from 'react'
import './Main.css'

export default function Main() {
    return (
        <div className="main">
            <a className="help-button" href="/help">
                ?
            </a>
            <a href="/fractal">
                <div className="fractal">
                    <img src="fractal.svg" alt="temp"></img>
                    <div className="text">
                        fractal
                    </div>
                </div>
            </a>
            <a href="/color-model">
                <div className="color-model">
                    <img src="color-model.svg" alt="temp"></img>
                    <div className="text">
                        color model
                    </div>
                </div>
            </a>
            <a href="/triangle">
                <div className="triangle">
                    <img src="triangle.svg" alt="temp"></img>
                    <div className="text">
                        triangle move
                    </div>
                </div>
            </a>
        </div>
    )
}
