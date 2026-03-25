import CharacterCard from "./CharacterCard"
import { kanaData } from "../data/kanaData"
import "./CharacterGrid.css"

export default function CharacterGrid() {
    return (
        <div className="character-grid">
            {kanaData.map((character, index) => (
                <CharacterCard
                    key={index}
                    kana={character.kana}
                    romaji={character.romaji}
                />
            ))}
        </div>
    )
}