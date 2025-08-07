'use client';

import { useState, useEffect, useCallback } from 'react';

const useGameEngine = () => {
  const [carPosition, setCarPosition] = useState({ x: 50, y: 80 });
  const [opponents, setOpponents] = useState<{ x: number; y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [carVelocity, setCarVelocity] = useState(0);
  const [keys, setKeys] = useState({ ArrowLeft: false, ArrowRight: false });

  const resetGame = () => {
    setCarPosition({ x: 50, y: 80 });
    setOpponents([]);
    setScore(0);
    setGameOver(false);
    setCarVelocity(0);
    setKeys({ ArrowLeft: false, ArrowRight: false });
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameOver) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      setKeys((prev) => ({ ...prev, [e.key]: true }));
    }
  }, [gameOver]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (gameOver) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      setKeys((prev) => ({ ...prev, [e.key]: false }));
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
      const newVelocity = (carVelocity + (keys.ArrowRight ? 0.5 : 0) - (keys.ArrowLeft ? 0.5 : 0)) * 0.95;
      setCarVelocity(newVelocity);
      setCarPosition((prev) => ({
        ...prev,
        x: Math.max(0, Math.min(100, prev.x + newVelocity)),
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
  }, [opponents, carPosition, gameOver, carVelocity, score, keys.ArrowLeft, keys.ArrowRight]);

  return { carPosition, opponents, score, gameOver, resetGame };
};

export default useGameEngine;