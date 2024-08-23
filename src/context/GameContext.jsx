import { createContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import spriteSheet from '../assets/sheet.png';

const GameContext = createContext("");

const GameProvider = ({ children }) => {
    const canvasRef = useRef(null);
    const sprites = new Image();
    sprites.src = spriteSheet;

    // Adicione um estado para armazenar a pontuação
    const [score, setScore] = useState(0);

    const collision = (flappybird, floor) => {
        const flappybirdY = flappybird.y + flappybird.height;
        const floorY = floor.y;
        return flappybirdY >= floorY;
    };

    return (
        <GameContext.Provider
            value={{
                sprites,
                canvasRef,
                collision,
                score, // Disponibilize a pontuação no contexto
                setScore, // Disponibilize a função para atualizar a pontuação no contexto
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
