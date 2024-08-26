import { createContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import spriteSheet from '../assets/sheet.png';

const GameContext = createContext("");

const GameProvider = ({ children }) => {
    const canvasRef = useRef(null);
    const sprites = new Image();
    sprites.src = spriteSheet;

    // Adicione um estado para armazenar a pontuação e a melhor pontuação
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    const updateBestScore = (newScore) => {
        if (newScore > bestScore) {
            setBestScore(newScore);
        }
    };

    return (
        <GameContext.Provider
            value={{
                sprites,
                canvasRef,
                score, 
                setScore,
                bestScore,
                updateBestScore
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

GameProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { GameProvider, GameContext };
