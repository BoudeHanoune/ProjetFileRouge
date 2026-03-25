import { useMemo, useState } from "react"
import { useLocalStorage } from "./useLocalStorage"

type KanaItem = {
    kana: string
    romaji: string
}

export function useQuiz(kanaData: KanaItem[]) {
    const shuffledData = useMemo(() => {
        return [...kanaData].sort(() => Math.random() - 0.5)
    }, [kanaData])

    const [currentIndex, setCurrentIndex] = useState(0)
    const [answer, setAnswer] = useState("")
    const [score, setScore] = useState(0)
    const [feedback, setFeedback] = useState("")
    const [answered, setAnswered] = useState(false)
    const [bestScore, setBestScore] = useLocalStorage<number>("bestScore", 0)

    const currentQuestion = shuffledData[currentIndex]

    const checkAnswer = () => {
        if (answered || answer.trim() === "") {
            return
        }

        const userAnswer = answer.trim().toLowerCase()
        const correctAnswer = currentQuestion.romaji.toLowerCase()

        if (userAnswer === correctAnswer) {
            const newScore = score + 1
            setScore(newScore)
            setFeedback("Bonne réponse !")

            if (newScore > bestScore) {
                setBestScore(newScore)
            }
        } else {
            setFeedback(`Mauvaise réponse. La bonne réponse était : ${currentQuestion.romaji}`)
        }

        setAnswered(true)
    }

    const nextQuestion = () => {
        const isLastQuestion = currentIndex === shuffledData.length - 1

        if (isLastQuestion) {
            setCurrentIndex(0)
            setAnswer("")
            setScore(0)
            setFeedback("")
            setAnswered(false)
            return
        }

        setCurrentIndex((prev) => prev + 1)
        setAnswer("")
        setFeedback("")
        setAnswered(false)
    }

    return {
        currentQuestion,
        answer,
        setAnswer,
        score,
        feedback,
        answered,
        bestScore,
        checkAnswer,
        nextQuestion
    }
}