import React from 'react'

export default function Answer(props) {
    const {value, isCorrect, isSelected, gameCompleted, setSelected, markQuestion} = props
    
    let classToAdd = ''
    if (gameCompleted) {
        if (isCorrect) {
            classToAdd = 'correct-answer'
        } else if (isSelected) {
            classToAdd = 'incorrect-answer'
        } else {
            classToAdd = 'answer-completed'
        }
    } else if (isSelected) {
        classToAdd = 'selected-answer'
    }
    
    function handleClick() {
        setSelected()
        markQuestion(isCorrect)
    }
    
    return (
        <p onClick={handleClick} className={`answer ${classToAdd}`}>{value}</p>
    )
}