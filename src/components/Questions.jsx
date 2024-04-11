import React, { useState } from 'react'

function QuestionResult({score, totalScore, tryAgain }){
    return(
        <>
            <div className='show-score'>
                Your Score: {score}
                Total Score: {totalScore}
            </div>
            <button id='next-button' onClick={tryAgain}>Try Again</button>
        </>
    )
}

const QuizData = [
    {
        question: "Which of the following hooks is used to store elements which can be called from any component in your React application?",
        options: ["useState", "useEffect", "useContext","useCallback"],
        answer: 3
    },
    {
        question: "Which of the following frameworks employs most if not all of React's practices?",
        options: ["Svelte", "Next", "Nuxt", "Vue"],
        answer: 2
    },
    {
        question: "Which of the following frameworks was developed by Google?",
        options: ["React", "Solid", "Angular", "Astro"],
        answer: 3
    },
    {
        question: "Which of the following can be considered a full-stack framework in and of itself?",
        options: ["Next", "Angular", "Vue", "Solid"],
        answer: 1
    },
]


export default function Questions() {
    const [showResults, setShowResults] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [clickedOption, setClickedOption] = useState(0)

    function updateScore(){
        if(clickedOption === QuizData[currentQuestion].answer){
            setScore(score + 1)
        }
    }

    function resetAll(){
        setShowResults(false);
        setCurrentQuestion(0);
        setScore(0);
        setClickedOption(0);
    }

    function changeQuestion(e){
        e.preventDefault();
        updateScore();
        if(currentQuestion < QuizData.length - 1){
            setCurrentQuestion(currentQuestion + 1);
            setClickedOption(0);
        }
    }

  return (
    <div>
        <h2 className='header-text'>Questions</h2>

        <div className='container'>
            {showResults ? (
                <QuestionResult score={score} totalScore={QuizData.length} tryAgain={resetAll}/>
            ) : (
                <>
                    <div className='questions'>
                        <span id='question-number'>{currentQuestion + 1}</span>
                        <span id='question-text'>{QuizData[currentQuestion].question}</span>
                    </div>

                    <div className='options-container'>
                        {
                            QuizData[currentQuestion].options.map((option, index) => {
                                function handleClick(e){
                                    e.preventDefault();
                                    setClickedOption(index+1)
                                }
                                return (
                                    <button className={`option-btn ${clickedOption === 1 + index ? "checked": null}`}
                                    key={index}
                                    onClick={handleClick}
                                    >{option}</button>
                                )
                            })
                        }
                    </div>

                    <input type='button' className='' value="next" id='next-button' onClick={changeQuestion}/>
                </>
            )}
        </div>
    </div>
  )
}
