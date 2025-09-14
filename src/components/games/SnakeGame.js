import React, { useState, useEffect, useCallback } from 'react';

const SnakeGame = () => {
  const gridSize = 15;
  const [snake, setSnake] = useState([{ x: 7, y: 7 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('RIGHT');
  const [nextDirection, setNextDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(150);
  const [isPaused, setIsPaused] = useState(false);

  // Generate random food position
  const generateFood = useCallback(() => {
    const possiblePositions = [];
    
    // Generate all possible positions
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const isOnSnake = snake.some(segment => segment.x === x && segment.y === y);
        if (!isOnSnake) {
          possiblePositions.push({ x, y });
        }
      }
    }
    
    // If no positions available (highly unlikely in snake game)
    if (possiblePositions.length === 0) {
      return { x: -1, y: -1 }; // Will trigger game win scenario
    }
    
    // Return random position from available positions
    return possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
  }, [snake, gridSize]);

  // Initialize game
  const initGame = useCallback(() => {
    const initialSnake = [{ x: 7, y: 7 }];
    setSnake(initialSnake);
    setFood(generateFood());
    setDirection('RIGHT');
    setNextDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setSpeed(150);
    setIsPaused(false);
  }, [generateFood]);

  // Handle keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === ' ') {
        setIsPaused(prev => !prev);
        return;
      }

      if (gameOver && e.key === 'Enter') {
        initGame();
        return;
      }

      if (isPaused) return;

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setNextDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setNextDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setNextDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setNextDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, gameOver, isPaused, initGame]);

  // Game loop
  useEffect(() => {
    if (gameOver || isPaused) return;

    const gameLoop = setInterval(() => {
      setSnake(prevSnake => {
        // Update direction at the beginning of each move
        setDirection(nextDirection);
        const head = { ...prevSnake[0] };
        
        // Move head based on direction
        switch (nextDirection) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
          default:
            break;
        }

        // Check wall collision
        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision (skip the head itself)
        if (prevSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];
        
        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          const newFood = generateFood();
          setFood(newFood);
          setScore(prev => {
            const newScore = prev + 1;
            // Increase speed every 5 points
            if (newScore > 0 && newScore % 5 === 0) {
              setSpeed(prevSpeed => Math.max(50, prevSpeed - 10));
            }
            return newScore;
          });
        } else {
          newSnake.pop(); // Remove tail if no food eaten
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(gameLoop);
  }, [nextDirection, food, gameOver, generateFood, score, speed, isPaused, gridSize]);

  // Mobile controls
  const handleSwipe = (newDirection) => {
    if (isPaused) return;
    
    switch (newDirection) {
      case 'UP':
        if (direction !== 'DOWN') setNextDirection('UP');
        break;
      case 'DOWN':
        if (direction !== 'UP') setNextDirection('DOWN');
        break;
      case 'LEFT':
        if (direction !== 'RIGHT') setNextDirection('LEFT');
        break;
      case 'RIGHT':
        if (direction !== 'LEFT') setNextDirection('RIGHT');
        break;
      default:
        break;
    }
  };

  // Render game grid efficiently
  const renderGrid = () => {
    const grid = [];
    
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const isSnake = snake.some(segment => segment.x === x && segment.y === y);
        const isHead = snake[0].x === x && snake[0].y === y;
        const isFood = food.x === x && food.y === y;
        
        let cellClass = 'w-4 h-4 md:w-5 md:h-5 border border-gray-200';
        
        if (isHead) {
          cellClass += ' bg-green-600';
        } else if (isSnake) {
          cellClass += ' bg-green-400';
        } else if (isFood) {
          cellClass += ' bg-red-500 rounded-full';
        } else {
          cellClass += ' bg-gray-100';
        }
        
        grid.push(
          <div key={`${x}-${y}`} className={cellClass} />
        );
      }
    }
    
    return grid;
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-center mb-4 pixel-font">🐍 SNAKE GAME</h3>
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-center">
          <div className="text-sm text-gray-600">SCORE</div>
          <div className="text-xl font-bold text-blue-600">{score}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">SPEED</div>
          <div className="text-xl font-bold text-red-600">{Math.round(150/speed)}x</div>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <div className="grid grid-cols-15 gap-0 pixel-border p-1 bg-white" style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}>
          {renderGrid()}
        </div>
      </div>

      {gameOver && (
        <div className="mb-4 p-3 bg-red-100 pixel-border">
          <div className="text-red-600 font-bold">GAME OVER!</div>
          <div>Final Score: {score}</div>
          <button 
            className="pixel-button bg-green-600 text-white mt-2 px-4 py-1"
            onClick={initGame}
          >
            PLAY AGAIN
          </button>
        </div>
      )}

      <div className="flex justify-center gap-2 mb-4">
        <button 
          className="pixel-button bg-gray-600 text-white px-3 py-1"
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? 'RESUME' : 'PAUSE'}
        </button>
        <button 
          className="pixel-button bg-blue-600 text-white px-3 py-1"
          onClick={initGame}
        >
          RESTART
        </button>
      </div>

      {/* Mobile Controls */}
      <div className="md:hidden">
        <div className="text-sm text-gray-600 mb-2">Swipe to control:</div>
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
          <div></div>
          <button 
            className="pixel-button bg-gray-300 p-3"
            onClick={() => handleSwipe('UP')}
          >
            ↑
          </button>
          <div></div>
          
          <button 
            className="pixel-button bg-gray-300 p-3"
            onClick={() => handleSwipe('LEFT')}
          >
            ←
          </button>
          <div className="bg-gray-200 pixel-border flex items-center justify-center">◎</div>
          <button 
            className="pixel-button bg-gray-300 p-3"
            onClick={() => handleSwipe('RIGHT')}
          >
            →
          </button>
          
          <div></div>
          <button 
            className="pixel-button bg-gray-300 p-3"
            onClick={() => handleSwipe('DOWN')}
          >
            ↓
          </button>
          <div></div>
        </div>
      </div>

      <div className="hidden md:block text-sm text-gray-600 mt-2">
        Use arrow keys to play • Space to pause • Enter to restart
      </div>
    </div>
  );
};

export default SnakeGame;