'use client';

import { useState } from 'react';
import Road from './Road';
import useGameEngine from '../hooks/useGameEngine';
import Car from './Car';
import Opponent from './Opponent';
import StartScreen from './StartScreen';
import GameOverScreen from './GameOverScreen';

const Game = () => {
  const [gameState, setGameState] = useState('not-started');
  const { carPosition, opponents, score, gameOver, resetGame } = useGameEngine();

  const handleStart = () => {
    setGameState('playing');
  };

  const handleRestart = () => {
    resetGame();
    setGameState('playing');
  };

  return (
    <div className="relative w-full h-screen bg-gray-800 overflow-hidden">
      {gameState === 'not-started' && <StartScreen onStart={handleStart} />}
      {gameState === 'playing' && (
        <>
          <Road />
          <Car position={carPosition} />
          {opponents.map((op, i) => (
            <Opponent key={i} position={op} />
          ))}
          <div className="absolute top-4 left-4 text-white text-2xl">
            Score: {score}
          </div>
          {gameOver && <GameOverScreen score={score} onRestart={handleRestart} />}
        </>
      )}
    </div>
  );
};

export default Game;