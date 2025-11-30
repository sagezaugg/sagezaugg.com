import React, { useEffect, useRef, useState } from "react";
import { TinySouls } from "../../games/TinySouls";
import MobileControls from "./MobileControls";

// Mobile detection hook
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(hasTouch && isSmallScreen);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

const TinySoulsComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<TinySouls | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const isMobile = useIsMobile();

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

  const handleAttack = () => {
    if (gameRef.current) {
      gameRef.current.handlePlayerAttack();
    }
  };

  const handleBlockStart = () => {
    if (gameRef.current) {
      const game = gameRef.current as any;
      // Always check for perfect block on new block press
      // The wasCtrlHeld check is handled inside checkPerfectBlockOnPress
      const wasBlocking = game.isPlayerBlocking;
      game.handlePlayerBlock();
      // Only check perfect block if this is a new block press (not already blocking)
      if (!wasBlocking) {
        game.wasCtrlHeld = false; // Reset to ensure perfect block check works
        game.checkPerfectBlockOnPress();
        game.wasCtrlHeld = true; // Set after checking
      }
    }
  };

  const handleBlockEnd = () => {
    if (gameRef.current) {
      const game = gameRef.current as any;
      game.isPlayerBlocking = false;
      game.wasCtrlHeld = false;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className="sheikah-border p-4 w-full max-w-4xl relative"
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
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            userSelect: "none",
            touchAction: "none",
          }}
        />
        {isMobile && (
          <MobileControls
            onAttack={handleAttack}
            onBlockStart={handleBlockStart}
            onBlockEnd={handleBlockEnd}
          />
        )}
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

