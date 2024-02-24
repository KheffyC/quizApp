import { useState } from "react"
import QuestionTimer from "./QuestionTimer"
import Answers from "./Answers"
import QUESTIONS from "../questions"

const Question = ({ questionIndex, onSelectAnswer, onSkipAnswer }) => {
  const [answer, setAnswer] = useState({
                                        selectedAnswer: '',
                                        isCorrect: null
                                      })


  let timer = 10000

  if (answer.selectedAnswer){
    timer = 500
  }

  if (answer.isCorrect !== null){
    timer = 1000
  }

  function handleSelectAnswer(selectedAnswer) {
    setAnswer({
      selectedAnswer: selectedAnswer,
      isCorrect: null
    })

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[questionIndex].answers[0] === selectedAnswer
      })

      setTimeout(() => {
        onSelectAnswer(selectedAnswer)
      }, 1000)

    }, 500)

  }

  let answerState = ''

  if (answer.selectedAnswer && answer.isCorrect !== null){
    answerState = answer.isCorrect ? 'correct' : 'wrong'
  } else if (answer.selectedAnswer){
    answerState = 'answered'
  }

  return (
    <div id='question'>
      <QuestionTimer
        key={timer}
        timeout={timer} 
        onTimeout={ answer.selectedAnswer == '' ? onSkipAnswer : null} 
        mode={answerState}
      />
      <h2>{ QUESTIONS[questionIndex].text }</h2>
      <Answers 
        answers={ QUESTIONS[questionIndex].answers } 
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState} 
        onSelectAnswer={handleSelectAnswer} 
      />
    </div>
  )
}

export default Question