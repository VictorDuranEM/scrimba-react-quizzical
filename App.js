import React from 'react'
import Start from './components/Start'
import Question from './components/Question'
import Loader from './components/Loader'
import {nanoid} from "nanoid"
import { decode } from 'js-base64';

export default function App() {
    
    const [gameStarted, setGameStarted] = React.useState(false)
    const [gameCompleted, setGameCompleted] = React.useState(false)
    const [questionsReady, setQuestionsReady] = React.useState(false)
    const [questionsData, setQuestionsData] = React.useState([])
    
    React.useEffect(() => {
        if (!gameCompleted) {
            async function getQuestions() {
                setQuestionsReady(false)
                const res = await fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple&category=9&encode=base64')
                const data = await res.json()
                setQuestionsData(data.results.map(result => createQuestion(result)))
                setQuestionsReady(true)
            }
            getQuestions()
        }
    }, [gameCompleted])
    
    function createQuestion(rawData) {
        return {
            id: nanoid(),
            question: decode(rawData.question),
            correctAnswer: decode(rawData.correct_answer),
            incorrectAnswers: rawData.incorrect_answers.map(e => decode(e)),
            isCorrect: false
        }
    }
    
    const questions = questionsData.map(question => 
        <Question 
            key={question.id}
            question={question.question}
            correctAnswer={question.correctAnswer}
            incorrectAnswers={question.incorrectAnswers}
            gameCompleted={gameCompleted}
            markQuestion={(value, id = question.id) => { markQuestion(value, id) }}
        />
    )
    
    function markQuestion(value, id) {
        setQuestionsData(prev => 
            prev.map(question => question.id === id ? {...question, isCorrect: value} : question))
    }
    
    function calculateScore() {
        return questionsData.reduce((prev, curr) => curr.isCorrect ? prev += 1 : prev, 0)
    }
    
    return (
        <div className="container">
            {!gameStarted ? 
                <Start startGame={() => setGameStarted(true)} />
                :
                questionsReady ? 
                    <div className="questions">
                        {questions}
                        <div className="questions-bottom">
                            {gameCompleted && <p className="questions-results">You scored {calculateScore()}/5 correct answers</p>}
                            <button onClick={() => setGameCompleted(prev => !prev)} className="btn btn-question">{gameCompleted ? 'Play again' : 'Check answers'}</button>
                        </div>
                    </div>
                    :
                    <Loader />
            }
            
        </div>
    )
}