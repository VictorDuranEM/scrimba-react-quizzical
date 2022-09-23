import React from 'react'

export default function Start(props) {
    return (
        <div className="start">
            <h1 className="start-title">Quizzical</h1>
            <p className="start-description">Test your knowledge</p>
            <button className="btn btn-start" onClick={props.startGame}>Start quiz</button>
        </div>
    )
}