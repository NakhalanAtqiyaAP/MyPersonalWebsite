import React, { useState, useEffect } from 'react';

const TargetClickerGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    generateNewTarget();
  };

  const generateNewTarget = () => {
    const x = Math.floor(Math.random() * 80) + 10;
    const y = Math.floor(Math.random() * 80) + 10;
    setTargetPosition({ x, y });
  };

  const handleTargetClick = () => {
    if (isPlaying) {
      setScore(score + 1);
      generateNewTarget();
    }
  };

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  return (
    <div>
      <h3 className="text-2xl font-bold text-center mb-6 pixel-font">🎯 TARGET CLICKER</h3>
      
      <div className="flex justify-between items-center mb-6">
        <div className="text-center">
          <div className="text-sm text-gray-600">SCORE</div>
          <div className="text-2xl font-bold text-blue-600">{score}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">TIME</div>
          <div className="text-2xl font-bold text-red-600">{timeLeft}s</div>
        </div>
      </div>

      <div className="relative bg-gray-200 pixel-border h-64 mb-6 overflow-hidden">
        {isPlaying ? (
          <div
            className="absolute w-12 h-12 bg-red-600 pixel-border cursor-pointer hover:scale-110 transition-transform"
            style={{ left: `${targetPosition.x}%`, top: `${targetPosition.y}%`, transform: 'translate(-50%, -50%)' }}
            onClick={handleTargetClick}
          >
            <span className="text-white text-xs">CLICK</span>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-500">{score > 0 ? `Game Over! Score: ${score}` : 'Click START to play!'}</span>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        {!isPlaying ? (
          <button className="pixel-button bg-green-600 text-white px-8 py-2 hover:bg-green-700" onClick={startGame}>
            {score > 0 ? 'PLAY AGAIN' : 'START GAME'}
          </button>
        ) : (
          <button className="pixel-button bg-red-600 text-white px-8 py-2 hover:bg-red-700" onClick={() => setIsPlaying(false)}>
            END GAME
          </button>
        )}
      </div>
    </div>
  );
};

export default TargetClickerGame;