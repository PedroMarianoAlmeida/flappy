import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TableHighscores from "../components/TableHighscores";
import SaveScore from "../components/SaveScore";

const Highscores = () => {
    const [saveScore, setSaveScore] = useState(false);
    const [score, setScore] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const scoreParam = queryParams.get('score');

        if (scoreParam) {
            setScore(Number(scoreParam));
            setSaveScore(true);
        }
    }, [location.search]);

    if (saveScore) {
        return (
            <>
                <SaveScore score={score} />
            </>
        );
    } else {
        return (
            <div className="flex flex-col w-full items-center">
                <h1 className="text-white text-3xl font-bold m-4">Rank</h1>
                <p className="text-white text-2xl m-0">Top 20 best scores</p>
                <TableHighscores />
            </div>
        );
    }
};

export default Highscores;
