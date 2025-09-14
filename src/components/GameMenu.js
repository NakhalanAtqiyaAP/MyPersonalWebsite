import React, { useState } from 'react';
import GameSelection from './games/GameSelection';
import TargetClickerGame from './games/TargetClickerGame';
import MemoryMatchGame from './games/MemoryMatchGame';
import ReactionTestGame from './games/ReactionTestGame';
import TicTacToeGame from './games/TicTacToeGame';
import FlappyBirdGame from './games/FlappyBirdGame';
import SnakeGame from './games/SnakeGame';

const GameMenu = () => {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    { id: 'clicker', name: 'Target Clicker', icon: '🎯', description: 'Click the target as fast as you can!' },
    { id: 'memory', name: 'Memory Match', icon: '🧠', description: 'Match the pairs in minimum moves' },
    { id: 'reaction', name: 'Reaction Test', icon: '⚡', description: 'Test your reaction speed' },
    { id: 'tictactoe', name: 'Tic Tac Toe', icon: '❌⭕', description: 'Classic X and O game' },
    { id: 'snake', name: 'Snake Game', icon: '🐍', description: 'Classic snake game' },
    { id: 'flappy', name: 'Flappy Bird', icon: '🐦', description: 'Fly through the pipes' }
  ];

  return (
    <section id="game-zone" className="py-8 md:py-12 px-4 pixel-grid min-h-screen flex items-center">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 pixel-font">
            <span className="glitch-text" data-text="GAME_ZONE">GAME_ZONE</span>
          </h2>
          <p className="text-gray-600">Play these simple games I created!</p>
        </div>

        {!activeGame ? (
          <GameSelection games={games} onSelectGame={setActiveGame} />
        ) : (
          <div className="pixel-border bg-white p-6 relative">
            <button
              onClick={() => setActiveGame(null)}
              className="absolute top-4 right-4 pixel-button bg-gray-600 text-white px-3 py-1 text-sm hover:bg-gray-700"
            >
              ← BACK
            </button>
            {activeGame === 'clicker' && <TargetClickerGame />}
            {activeGame === 'memory' && <MemoryMatchGame />}
            {activeGame === 'reaction' && <ReactionTestGame />}
            {activeGame === 'tictactoe' && <TicTacToeGame />}
            {activeGame === 'snake' && <SnakeGame />}
            {activeGame === 'flappy' && <FlappyBirdGame />}
          </div>
        )}
      </div>
    </section>
  );
};

export default GameMenu;