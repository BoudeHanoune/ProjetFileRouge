import CharacterGrid from "../components/CharacterGrid"
import "./Page.css"

export default function StudyPage() {
    return (
        <section className="page-card">
            <h2>Mode étude</h2>
            <p>
                Voici les kana à apprendre avant de passer au quiz.
            </p>
            <CharacterGrid />
        </section>
    )
}