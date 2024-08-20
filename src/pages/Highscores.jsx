import { useState } from "react"
import TableHighscores from "../components/TableHighscores"
import SaveScore from "../components/SaveScore";

const Highscores = () => {

    const [saveScore, setSaveScore] = useState(false);
    const [score, setScore] = useState(10);

    if (saveScore === true) {
        return (
            <>
                <SaveScore
                    score={score}
                />

            </>
        )

    } else {
        return (

            <div className="flex flex-col w-full items-center">
                <h1 className="text-white text-3xl font-bold m-4">Rank</h1>
                <p className="text-white text-2xl m-0">Top 20 best scores</p>
                <TableHighscores />
            </div>
        )
    }
}

export default Highscores