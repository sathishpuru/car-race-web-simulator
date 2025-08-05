
'use client';

import { useState, useEffect, useCallback } from 'react';

const useGameEngine = () => {
  const [carPosition, setCarPosition] = useState({ x: 50, y: 80 });
  const [opponents, setOpponents] = useState<{ x: number; y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [carVelocity, setCarVelocity] = useState(0);
  const [acceleration, setAcceleration] = useState(0);

  const resetGame = () => {
    setCarPosition({ x: 50, y: 80 });
    setOpponents([]);
    setScore(0);
    setGameOver(false);
    setCarVelocity(0);
    setAcceleration(0);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameOver) return;

    switch (e.key) {
      case 'ArrowLeft':
        setAcceleration(-0.5);
        break;
      case 'ArrowRight':
        setAcceleration(0.5);
        break;
      default:
        break;
    }
  }, [gameOver]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (gameOver) return;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      setAcceleration(0);
    }
  }, [gameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      // Move car
      setCarVelocity((prev) => prev + acceleration);
      setCarVelocity((prev) => prev * 0.95); // Friction
      setCarPosition((prev) => ({
        ...prev,
        x: Math.max(0, Math.min(100, prev.x + carVelocity)),
      }));

      // Move opponents
      const opponentSpeed = 2 + Math.floor(score / 500);
      setOpponents((prev) =>
        prev
          .map((op) => ({ ...op, y: op.y + opponentSpeed }))
          .filter((op) => op.y < 100)
      );

      // Add new opponents
      const opponentFrequency = 0.1 + Math.floor(score / 1000) * 0.05;
      if (Math.random() < opponentFrequency) {
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
  }, [opponents, carPosition, gameOver, carVelocity, score]);

  return { carPosition, opponents, score, gameOver, resetGame };
};

export default useGameEngine;
