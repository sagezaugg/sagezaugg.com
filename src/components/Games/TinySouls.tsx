import React, { useEffect, useRef, useState } from "react";
import { TinySouls } from "../../games/TinySouls";

const TinySoulsComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<TinySouls | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    // Create game instance
    const game = new TinySouls(canvasRef.current);
    gameRef.current = game;

    // Handle restart key
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "r" || e.key === "R") {
        if (gameRef.current) {
          gameRef.current.restart();
          setIsGameOver(false);
        }
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    // Start the game
    game.start();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      if (gameRef.current) {
        gameRef.current.cleanup();
      }
    };
  }, []);

  const handleRestart = () => {
    if (gameRef.current) {
      gameRef.current.restart();
      setIsGameOver(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="sheikah-border p-4 w-full max-w-4xl">
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{ display: "block" }}
        />
      </div>
      <div className="mt-4">
        <button
          onClick={handleRestart}
          className="px-6 py-2 sheikah-border text-zelda-light-blue hover:text-zelda-gold transition-colors duration-300"
        >
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default TinySoulsComponent;

