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
        <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zelda-dark/50 to-transparent" />
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

