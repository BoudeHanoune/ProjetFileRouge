import "./CharacterCard.css"

type Props = {
    kana: string
    romaji: string
}

export default function CharacterCard({ kana, romaji }: Props) {
    return (
        <div className="character-card">
            <div className="character-card-kana">{kana}</div>
            <div className="character-card-romaji">{romaji}</div>
        </div>
    )
}