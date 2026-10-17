import { useState } from 'react'
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import type { Quiz } from '../data/quizzes'
import './KnowledgeCheck.css'

interface KnowledgeCheckProps {
  quiz: Quiz
}

function KnowledgeCheck({ quiz }: KnowledgeCheckProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const question = quiz.questions[currentQuestion]
  const isCorrect = selectedAnswer === question.correctIndex
  const totalQuestions = quiz.questions.length

  function handleSelect(index: number) {
    if (hasSubmitted) return
    setSelectedAnswer(index)
    setHasSubmitted(true)
  }

  function handleRetry() {
    setSelectedAnswer(null)
    setHasSubmitted(false)
  }

  function handleNext() {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setHasSubmitted(false)
    }
  }

  return (
    <div className="quiz">
      <div className="quiz-header">
        <h3 className="quiz-title">Quick Quiz</h3>
        {totalQuestions > 1 && (
          <span className="quiz-counter">
            {currentQuestion + 1} / {totalQuestions}
          </span>
        )}
      </div>

      <p className="quiz-question">{question.question}</p>

      <div className="quiz-options" role="radiogroup" aria-label="Answer options">
        {question.options.map((option, i) => {
          const letter = String.fromCharCode(65 + i)
          let className = 'quiz-option'
          if (hasSubmitted) {
            if (i === question.correctIndex) {
              className += ' quiz-option--correct'
            } else if (i === selectedAnswer) {
              className += ' quiz-option--incorrect'
            }
          } else if (i === selectedAnswer) {
            className += ' quiz-option--selected'
          }

          return (
            <button
              key={i}
              className={className}
              onClick={() => handleSelect(i)}
              disabled={hasSubmitted}
              type="button"
              role="radio"
              aria-checked={selectedAnswer === i}
              aria-label={`${letter}: ${option}`}
            >
              <span className="quiz-option-letter">{letter}</span>
              <span className="quiz-option-text">{option}</span>
            </button>
          )
        })}
      </div>

      {hasSubmitted && (
        <div className={`quiz-feedback ${isCorrect ? 'quiz-feedback--correct' : 'quiz-feedback--incorrect'}`}>
          <div className="quiz-feedback-header">
            {isCorrect ? (
              <>
                <CheckCircle size={18} className="quiz-feedback-icon" />
                <span className="quiz-feedback-label">Correct!</span>
              </>
            ) : (
              <>
                <XCircle size={18} className="quiz-feedback-icon" />
                <span className="quiz-feedback-label">Not quite</span>
              </>
            )}
          </div>
          <p className="quiz-feedback-text">{question.explanation}</p>

          <div className="quiz-actions">
            {!isCorrect && (
              <button className="quiz-action quiz-action--retry" onClick={handleRetry} type="button">
                <RotateCcw size={14} />
                Try again
              </button>
            )}
            {currentQuestion < totalQuestions - 1 && (
              <button className="quiz-action quiz-action--next" onClick={handleNext} type="button">
                Next question →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default KnowledgeCheck
