import React, { useState, useEffect, useCallback } from 'react';

const FlappyBirdGame = () => {
  const [birdPosition, setBirdPosition] = useState(50);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const gravity = 0.5;
  const jumpStrength = -8;
  const pipeWidth = 50;
  const gapHeight = 120;
  const gameHeight = 400;
  const gameWidth = 300;

  // Initialize game
  const initGame = useCallback(() => {
    setBirdPosition(50);
    setBirdVelocity(0);
    setPipes([]);
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
  }, []);

  // Handle user input
  const handleJump = useCallback(() => {
    if (!gameStarted && !gameOver) {
      setGameStarted(true);
    }
    if (gameStarted && !gameOver) {
      setBirdVelocity(jumpStrength);
    }
    if (gameOver) {
      initGame();
    }
  }, [gameStarted, gameOver, initGame]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleJump]);

  // Touch controls
  const handleTouch = () => {
    handleJump();
  };

  // Game physics
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      // Update bird position
      setBirdPosition(prev => {
        const newPosition = prev + birdVelocity;
        setBirdVelocity(prevVelocity => prevVelocity + gravity);
        
        // Check ground collision
        if (newPosition >= gameHeight - 20) {
          setGameOver(true);
          if (score > highScore) setHighScore(score);
          return gameHeight - 20;
        }
        
        // Check ceiling collision
        if (newPosition <= 0) {
          return 0;
        }
        
        return newPosition;
      });

      // Update pipes
      setPipes(prevPipes => {
        const newPipes = prevPipes.map(pipe => ({
          ...pipe,
          x: pipe.x - 2
        })).filter(pipe => pipe.x > -pipeWidth);

        // Add new pipe
        if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < gameWidth - 200) {
          const gapPosition = Math.random() * (gameHeight - gapHeight - 100) + 50;
          newPipes.push({
            x: gameWidth,
            gapPosition,
            passed: false
          });
        }

        // Check collisions and score
        newPipes.forEach(pipe => {
          // Check if pipe passed
          if (!pipe.passed && pipe.x + pipeWidth < 40) {
            pipe.passed = true;
            setScore(prev => prev + 1);
          }

          // Check collision with pipe
          if (
            pipe.x < 60 && pipe.x + pipeWidth > 40 &&
            (birdPosition < pipe.gapPosition || birdPosition + 20 > pipe.gapPosition + gapHeight)
          ) {
            setGameOver(true);
            if (score > highScore) setHighScore(score);
          }
        });

        return newPipes;
      });
    }, 20);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, birdVelocity, score, highScore, gameHeight]);

  // Render pipes
  const renderPipes = () => {
    return pipes.map((pipe, index) => (
      <div key={index}>
        {/* Top pipe */}
        <div
          className="absolute bg-green-600"
          style={{
            left: `${pipe.x}px`,
            width: `${pipeWidth}px`,
            top: 0,
            height: `${pipe.gapPosition}px`
          }}
        />
        {/* Bottom pipe */}
        <div
          className="absolute bg-green-600"
          style={{
            left: `${pipe.x}px`,
            width: `${pipeWidth}px`,
            top: `${pipe.gapPosition + gapHeight}px`,
            height: `${gameHeight - pipe.gapPosition - gapHeight}px`
          }}
        />
      </div>
    ));
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-center mb-4 pixel-font">🐦 FLAPPY BIRD</h3>
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-center">
          <div className="text-sm text-gray-600">SCORE</div>
          <div className="text-xl font-bold text-blue-600">{score}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">BEST</div>
          <div className="text-xl font-bold text-red-600">{highScore}</div>
        </div>
      </div>

      <div 
        className="relative mx-auto pixel-border bg-blue-200 overflow-hidden"
        style={{ width: `${gameWidth}px`, height: `${gameHeight}px` }}
        onClick={handleTouch}
      >
        {/* Bird */}
        <div
          className="absolute bg-yellow-400 rounded-full flex items-center justify-center text-xs"
          style={{
            left: '40px',
            top: `${birdPosition}px`,
            width: '30px',
            height: '30px'
          }}
        >
          🐦
        </div>

        {/* Pipes */}
        {renderPipes()}

        {/* Ground */}
        <div className="absolute bottom-0 w-full bg-green-800 h-10" />

        {/* Start message */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white pixel-border p-4">
              <div className="font-bold mb-2">Tap/Click or Press Space</div>
              <button 
                className="pixel-button bg-green-600 text-white px-4 py-1"
                onClick={handleJump}
              >
                START
              </button>
            </div>
          </div>
        )}

        {/* Game over message */}
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white pixel-border p-4">
              <div className="font-bold text-red-600 mb-2">GAME OVER!</div>
              <div>Score: {score}</div>
              <div>Best: {highScore}</div>
              <button 
                className="pixel-button bg-green-600 text-white mt-2 px-4 py-1"
                onClick={initGame}
              >
                PLAY AGAIN
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        {!gameStarted ? 'Tap/Click or press Space to start' : 'Tap/Click or press Space to flap'}
      </div>
    </div>
  );
};

export default FlappyBirdGame;