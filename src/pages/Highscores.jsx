import { useState, useEffect, useContext } from "react";
import { GameContext } from "../context/GameContext";
import TableHighscores from "../components/TableHighscores";
import SaveScore from "../components/SaveScore";
import { useTranslation } from 'react-i18next';

const Highscores = () => {
    const [scoreReal, setScoreReal] = useState(null);
    const { score } = useContext(GameContext);
    const { t } = useTranslation()
    useEffect(() => {
        if (score !== undefined) {
            setScoreReal(score);
        }
    }, [score]);

    return (
        <div className="flex flex-col w-full items-center mt-7">
            {scoreReal !== 0 ? (
                <SaveScore score={scoreReal} />
            ) : (
                <>
                    <h1 className="text-white text-3xl font-bold m-4">{t("Rank")}</h1>
                    <p className="text-white text-2xl m-0">{t("Top 20 best scores")}</p>
                    <TableHighscores />
                </>
            )}
        </div>
    );
};

export default Highscores;
