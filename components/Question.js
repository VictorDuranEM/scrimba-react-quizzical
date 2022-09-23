import React from 'react'
import Answer from './Answer'
import {nanoid} from "nanoid"

export default function Question(props) {
    const {question, correctAnswer, incorrectAnswers, gameCompleted, markQuestion} = props
    const [answers, setAnswers] = React.useState([])
    
    function combineAnswers(correctAnswer, incorrectAnswers) {
        const randomPosition = Math.floor(Math.random() * 4)
        const answers = []
        let incorrectAnswersPosition = 0
        for (let i = 0; i < 4; i++) {
            if (i === randomPosition) {
                answers.push(createAnswer(correctAnswer, true))
            } else {
                answers.push(createAnswer(incorrectAnswers[incorrectAnswersPosition], false))
                incorrectAnswersPosition++
            }
        }
        return answers
    }
    
    function createAnswer(value, isCorrect) {
        return {
            id: nanoid(),
            value: value,
            isCorrect: isCorrect,
            isSelected: false
        }
    }
    
    function setSelected(id) {
        setAnswers(prev => 
            prev.map(answer => answer.id === id ? {...answer, isSelected: true} : {...answer, isSelected: false})
        )
    }
    
    React.useEffect(() => {
        setAnswers(combineAnswers(correctAnswer, incorrectAnswers))
    }, [])
    
    return (
        <div className="question">
            <p className="question-title">{question}</p>
            <div className="answers">
                {answers.map(answer => (
                    <Answer 
                        key={answer.id}
                        value={answer.value}
                        isCorrect={answer.isCorrect}
                        isSelected={answer.isSelected}
                        gameCompleted={gameCompleted}
                        setSelected={() => setSelected(answer.id)}
                        markQuestion={markQuestion}
                    />
                ))}
            </div>
        </div>
    )
}