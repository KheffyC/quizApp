import { useState, useCallback } from 'react'
import QUESTIONS from '../questions.js'
import Question from './Question.jsx'
import Summary from './Summary.jsx'

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([])
  const activeQuestionIndex = userAnswers.length
  const quizIsComplete = userAnswers.length === QUESTIONS.length
  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer])
  }, [activeQuestionIndex])

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])
  
  if (quizIsComplete){
    return <Summary userAnswers={userAnswers} />
  }

  return (
    <div id='quiz'>
      <Question 
        key={activeQuestionIndex}
        questionIndex={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  )
}

export default Quiz