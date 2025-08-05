
'use client';

import { useState, useEffect } from 'react';
import Car from './Car';
import Opponent from './Opponent';

const Game = () => {
  const [carPosition, setCarPosition] = useState({ x: 50, y: 80 });
  const [opponents, setOpponents] = useState<{ x: number; y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (gameOver) return;

    switch (e.key) {
      case 'ArrowLeft':
        setCarPosition((prev) => ({ ...prev, x: Math.max(0, prev.x - 5) }));
        break;
      case 'ArrowRight':
        setCarPosition((prev) => ({ ...prev, x: Math.min(100, prev.x + 5) }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      // Move opponents
      setOpponents((prev) =>
        prev
          .map((op) => ({ ...op, y: op.y + 2 }))
          .filter((op) => op.y < 100)
      );

      // Add new opponents
      if (Math.random() < 0.1) {
        setOpponents((prev) => [
          ...prev,
          { x: Math.random() * 100, y: -10 },
        ]);
      }

      // Collision detection
      opponents.forEach((op) => {
        if (
          Math.abs(op.x - carPosition.x) < 10 &&
          Math.abs(op.y - carPosition.y) < 10
        ) {
          setGameOver(true);
        }
      });

      setScore((prev) => prev + 1);
    }, 50);

    return () => clearInterval(gameLoop);
  }, [opponents, carPosition, gameOver]);

  return (
    <div className="relative w-full h-screen bg-gray-800 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-full bg-gray-600">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-white"></div>
      </div>
      <Car position={carPosition} />
      {opponents.map((op, i) => (
        <Opponent key={i} position={op} />
      ))}
      <div className="absolute top-4 left-4 text-white text-2xl">
        Score: {score}
      </div>
      {gameOver && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl">
          Game Over
        </div>
      )}
    </div>
  );
};

export default Game;
