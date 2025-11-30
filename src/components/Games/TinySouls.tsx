import React, { useEffect, useRef, useState } from "react";
import { TinySouls } from "../../games/TinySouls";

const TinySoulsComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<TinySouls | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  // Trigger resize when fullscreen state changes
  useEffect(() => {
    // Small delay to ensure DOM has updated
    const timeoutId = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [isFullscreen]);

  const handleRestart = () => {
    if (gameRef.current) {
      gameRef.current.restart();
      setIsGameOver(false);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`flex flex-col items-center ${isFullscreen ? "fixed inset-0 z-50 bg-[#0b2e36] p-4" : ""}`}>
      <div 
        ref={containerRef}
        className={`sheikah-border p-4 relative ${
          isFullscreen 
            ? "w-full h-full flex items-center justify-center" 
            : "w-full max-w-4xl"
        }`}
        style={{
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          userSelect: "none",
          touchAction: "none",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ 
            display: "block",
            maxWidth: "100%",
            maxHeight: isFullscreen ? "100%" : "none",
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            userSelect: "none",
            touchAction: "none",
          }}
        />
      </div>
      <div className={`flex gap-4 ${isFullscreen ? "mt-4" : "mt-4"}`}>
        <button
          onClick={handleRestart}
          className="px-6 py-2 sheikah-border text-zelda-light-blue hover:text-zelda-gold transition-colors duration-300"
        >
          Restart Game
        </button>
        <button
          onClick={toggleFullscreen}
          className="px-6 py-2 sheikah-border text-zelda-light-blue hover:text-zelda-gold transition-colors duration-300"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
      </div>
    </div>
  );
};

export default TinySoulsComponent;

