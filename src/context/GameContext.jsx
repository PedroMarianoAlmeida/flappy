// context/FirebaseContext.jsx
import { createContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import spriteSheet from '../assets/sheet.png';

const GameContext = createContext("");
const GameProvider = ({ children }) => {
    const canvasRef = useRef(null)
    const sprites = new Image();
    sprites.src = spriteSheet;
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
