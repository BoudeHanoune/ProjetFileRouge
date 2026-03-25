import { useEffect, useRef } from "react"
import { kanaData } from "../data/kanaData"
import { useQuiz } from "../hooks/useQuiz"
import "./QuizMode.css"

export default function QuizMode() {
    const {
        currentQuestion,
        answer,
        setAnswer,
        score,
        feedback,
        answered,
        bestScore,
        checkAnswer,
        nextQuestion
    } = useQuiz(kanaData)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!answered) {
            inputRef.current?.focus()
        }
    }, [currentQuestion, answered])

    return (
        <div className="quiz-card">
            <div className="quiz-scores">
                <div className="quiz-score-box">
                    <span>Score</span>
                    <strong>{score}</strong>
                </div>

                <div className="quiz-score-box">
                    <span>Meilleur score</span>
                    <strong>{bestScore}</strong>
                </div>
            </div>

            <p className="quiz-label">Quel est le rōmaji de ce kana ?</p>

            <h1 className="quiz-kana">{currentQuestion.kana}</h1>

            <input
                ref={inputRef}
                className="quiz-input"
                type="text"
                placeholder="Écris ta réponse"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={answered}
            />

            <div className="quiz-actions">
                <button
                    className="quiz-button primary"
                    onClick={checkAnswer}
                    disabled={answered || answer.trim() === ""}
                >
                    Vérifier
                </button>

                <button
                    className="quiz-button secondary"
                    onClick={nextQuestion}
                    disabled={!answered}
                >
                    Suivante
                </button>
            </div>

            <p className="quiz-feedback">{feedback}</p>
        </div>
    )
}