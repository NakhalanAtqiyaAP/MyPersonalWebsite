import React from 'react';

const GameSelection = ({ games, onSelectGame }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {games.map((game) => (
      <div
        key={game.id}
        className="pixel-border bg-white p-6 text-center cursor-pointer hover:scale-105 transition-transform"
        onClick={() => onSelectGame(game.id)}
      >
        <div className="text-4xl mb-4">{game.icon}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 pixel-font">{game.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{game.description}</p>
        <button className="pixel-button bg-blue-600 text-white px-6 py-2 hover:bg-blue-700">
          PLAY
        </button>
      </div>
    ))}
  </div>
);

export default GameSelection;