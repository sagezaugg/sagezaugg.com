import React from "react";
import { useParams } from "react-router-dom";
import TinySoulsComponent from "../components/Games/TinySouls";
import { games } from "../utils/gamesConstants";

const Game: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();

  const game = games.find((g) => g.id === gameId);

  const renderGame = () => {
    switch (gameId) {
      case "tiny-souls":
        return <TinySoulsComponent />;
      default:
        return (
          <div className="py-12 text-center">
            <h2 className="text-4xl font-serif text-zelda-gold mb-4">
              Game Not Found
            </h2>
            <p className="text-zelda-light-blue">
              The game you're looking for doesn't exist.
            </p>
          </div>
        );
    }
  };

  if (!game) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-4xl font-serif text-zelda-gold mb-4">
          Game Not Found
        </h2>
        <p className="text-zelda-light-blue">
          The game you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="pb-12 pt-4">
      {/* Game Header with Logo */}
      {game.thumbnail && (
        <div className="flex flex-col items-center mb-6">
          <div className="max-w-[200px] w-full">
            <img
              src={game.thumbnail}
              alt={game.title}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}

      {/* Game Component */}
      {renderGame()}
    </div>
  );
};

export default Game;

