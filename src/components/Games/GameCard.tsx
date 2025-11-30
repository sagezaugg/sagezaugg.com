import React from "react";
import { Link } from "react-router-dom";
import { GameMetadata } from "../../types/games";
import { Card } from "../common/Card";

interface GameCardProps {
  game: GameMetadata;
  index: number;
}

export const GameCard: React.FC<GameCardProps> = ({ game, index }) => {
  const linkClassName =
    "inline-block text-zelda-gold hover:text-zelda-light-blue transition-colors duration-300";

  return (
    <Card index={index} className="p-4 sm:p-6">
      {game.thumbnail && (
        <div className="relative h-48 mb-4 overflow-hidden rounded-lg bg-zelda-dark/30 flex items-center justify-center p-4">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      <h3 className="text-2xl font-serif text-zelda-gold mb-2">
        {game.title}
      </h3>

      <p className="text-zelda-light-blue mb-4">{game.description}</p>

      <div className="flex gap-4">
        <Link to={`/games/${game.id}`} className={linkClassName}>
          Play Game →
        </Link>
      </div>
    </Card>
  );
};

