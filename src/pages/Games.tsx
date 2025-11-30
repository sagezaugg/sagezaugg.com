import React from "react";
import { GameCard } from "../components/Games/GameCard";
import { games } from "../utils/gamesConstants";

const Games: React.FC = () => {
  return (
    <div className="py-12">
      <h2 className="text-4xl font-serif text-zelda-gold text-center mb-12">
        Games
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game, index) => (
          <GameCard key={game.id} game={game} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Games;

