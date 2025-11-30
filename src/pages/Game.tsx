import React from "react";
import { useParams } from "react-router-dom";
import TinySoulsComponent from "../components/Games/TinySouls";

const Game: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();

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

  return <div className="py-12">{renderGame()}</div>;
};

export default Game;

