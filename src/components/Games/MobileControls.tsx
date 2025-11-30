import React, { useState, useRef, useEffect } from "react";

interface MobileControlsProps {
  onAttack: () => void;
  onBlockStart: () => void;
  onBlockEnd: () => void;
}

const MobileControls: React.FC<MobileControlsProps> = ({
  onAttack,
  onBlockStart,
  onBlockEnd,
}) => {
  const [isAttackPressed, setIsAttackPressed] = useState(false);
  const [isBlockPressed, setIsBlockPressed] = useState(false);
  const attackButtonRef = useRef<HTMLButtonElement>(null);
  const blockButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const attackButton = attackButtonRef.current;
    const blockButton = blockButtonRef.current;

    if (!attackButton || !blockButton) return;

    const handleAttackStart = (e: TouchEvent) => {
      e.preventDefault();
      setIsAttackPressed(true);
      onAttack();
    };

    const handleAttackEnd = (e: TouchEvent) => {
      e.preventDefault();
      setIsAttackPressed(false);
    };

    const handleBlockStart = (e: TouchEvent) => {
      e.preventDefault();
      setIsBlockPressed(true);
      onBlockStart();
    };

    const handleBlockEnd = (e: TouchEvent) => {
      e.preventDefault();
      setIsBlockPressed(false);
      onBlockEnd();
    };

    attackButton.addEventListener("touchstart", handleAttackStart, {
      passive: false,
    });
    attackButton.addEventListener("touchend", handleAttackEnd, {
      passive: false,
    });
    attackButton.addEventListener("touchcancel", handleAttackEnd, {
      passive: false,
    });

    blockButton.addEventListener("touchstart", handleBlockStart, {
      passive: false,
    });
    blockButton.addEventListener("touchend", handleBlockEnd, {
      passive: false,
    });
    blockButton.addEventListener("touchcancel", handleBlockEnd, {
      passive: false,
    });

    return () => {
      attackButton.removeEventListener("touchstart", handleAttackStart);
      attackButton.removeEventListener("touchend", handleAttackEnd);
      attackButton.removeEventListener("touchcancel", handleAttackEnd);
      blockButton.removeEventListener("touchstart", handleBlockStart);
      blockButton.removeEventListener("touchend", handleBlockEnd);
      blockButton.removeEventListener("touchcancel", handleBlockEnd);
    };
  }, [onAttack, onBlockStart, onBlockEnd]);

  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-10 md:hidden">
      <div className="flex justify-between items-end px-4 pb-4">
        {/* Block Button - Left */}
        <button
          ref={blockButtonRef}
          className={`
            pointer-events-auto
            w-20 h-20
            rounded-full
            border-2
            flex items-center justify-center
            transition-all duration-150
            select-none
            touch-manipulation
            ${isBlockPressed
              ? "bg-zelda-light-blue border-zelda-gold scale-95 shadow-lg"
              : "bg-zelda-teal border-zelda-light-blue shadow-sheikah"
            }
          `}
          style={{
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            userSelect: "none",
          }}
        >
          <span className="text-white font-bold text-sm">BLOCK</span>
        </button>

        {/* Attack Button - Right */}
        <button
          ref={attackButtonRef}
          className={`
            pointer-events-auto
            w-20 h-20
            rounded-full
            border-2
            flex items-center justify-center
            transition-all duration-150
            select-none
            touch-manipulation
            ${isAttackPressed
              ? "bg-zelda-gold border-zelda-light-blue scale-95 shadow-lg"
              : "bg-zelda-teal border-zelda-light-blue shadow-sheikah"
            }
          `}
          style={{
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            userSelect: "none",
          }}
        >
          <span className="text-white font-bold text-sm">ATTACK</span>
        </button>
      </div>
    </div>
  );
};

export default MobileControls;

