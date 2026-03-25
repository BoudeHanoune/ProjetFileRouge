import QuizMode from "../components/QuizMode"
import "./Page.css"

export default function QuizPage() {
    return (
        <section className="page-card">
            <h2>Mode quiz</h2>
            <p>
                Réponds aux questions et essaye de battre ton meilleur score.
            </p>
            <QuizMode />
        </section>
    )
}