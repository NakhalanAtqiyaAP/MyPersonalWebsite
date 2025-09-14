import React, { useState, useEffect } from 'react';

const GameMenu = () => {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    { id: 'clicker', name: 'Target Clicker', icon: '🎯', description: 'Click the target as fast as you can!' },
    { id: 'memory', name: 'Memory Match', icon: '🧠', description: 'Match the pairs in minimum moves' },
    { id: 'reaction', name: 'Reaction Test', icon: '⚡', description: 'Test your reaction speed' },
    { id: 'tictactoe', name: 'Tic Tac Toe', icon: '❌⭕', description: 'Classic X and O game' }
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
          </div>
        )}
      </div>
    </section>
  );
};

// Komponen Pemilihan Game
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

// Game 1: Target Clicker
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

// Game 2: Memory Match
const MemoryMatchGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);

  const symbols = ['🐱', '🐶', '🐰', '🐻', '🐵', '🐦'];

  const initializeGame = () => {
    const gameCards = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol, flipped: false }));
    
    setCards(gameCards);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
  };

  const handleCardClick = (id) => {
    if (flipped.length === 2 || solved.includes(id) || flipped.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].symbol === cards[second].symbol) {
        setSolved([...solved, first, second]);
      }

      setTimeout(() => setFlipped([]), 1000);
    }
  };

  useEffect(() => initializeGame(), []);

  return (
    <div>
      <h3 className="text-2xl font-bold text-center mb-6 pixel-font">🧠 MEMORY MATCH</h3>
      
      <div className="text-center mb-4">
        <div className="text-lg font-bold text-blue-600">Moves: {moves}</div>
        <div className="text-sm text-gray-600">Pairs Found: {solved.length / 2} / {symbols.length}</div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`pixel-border h-16 md:h-20 flex items-center justify-center cursor-pointer text-2xl ${
              flipped.includes(card.id) || solved.includes(card.id)
                ? 'bg-blue-200'
                : 'bg-gray-300 hover:bg-gray-200'
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            {flipped.includes(card.id) || solved.includes(card.id) ? card.symbol : '?'}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <button className="pixel-button bg-blue-600 text-white px-6 py-2 hover:bg-blue-700" onClick={initializeGame}>
          RESTART
        </button>
      </div>
    </div>
  );
};

// Game 3: Reaction Test
const ReactionTestGame = () => {
  const [reactionTime, setReactionTime] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [results, setResults] = useState([]);

  const startTest = () => {
    setWaiting(true);
    setReactionTime(null);
    
    const randomDelay = 1000 + Math.random() * 4000;
    setTimeout(() => {
      setStartTime(Date.now());
      setWaiting(false);
    }, randomDelay);
  };

  const handleClick = () => {
    if (waiting) {
      setWaiting(false);
      setReactionTime(null);
      alert('Too early! Wait for the color to change.');
      return;
    }

    if (startTime) {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setResults([...results, time].slice(-5));
      setStartTime(null);
    } else {
      startTest();
    }
  };

  const getAverage = () => {
    if (results.length === 0) return 0;
    return Math.round(results.reduce((a, b) => a + b, 0) / results.length);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-center mb-6 pixel-font">⚡ REACTION TEST</h3>
      
      <div className="text-center mb-6">
        <div className={`pixel-border h-40 flex items-center justify-center cursor-pointer text-xl ${
          waiting ? 'bg-red-400' : startTime ? 'bg-green-400' : 'bg-gray-300'
        }`}
        onClick={handleClick}
        >
          {waiting ? 'Wait for green...' : startTime ? 'CLICK NOW!' : reactionTime ? `Click to try again` : 'Click to start'}
        </div>
      </div>

      {reactionTime && (
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-blue-600">Reaction Time: {reactionTime}ms</div>
          {results.length > 1 && (
            <div className="text-sm text-gray-600 mt-2">Average: {getAverage()}ms</div>
          )}
        </div>
      )}

      <div className="text-center">
        <button className="pixel-button bg-purple-600 text-white px-6 py-2 hover:bg-purple-700" onClick={startTest}>
          NEW TEST
        </button>
      </div>
    </div>
  );
};
// Game 4: Tic Tac Toe
const TicTacToeGame = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [gameHistory, setGameHistory] = useState([]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      // Perbaikan: Pastikan semua kotak memiliki nilai yang sama dan bukan null
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    
    // Perbaikan: Kembalikan null jika masih ada kotak kosong, 'Draw' jika tidak ada pemenang
    return squares.includes(null) ? null : 'Draw';
  };

  const handleClick = (i) => {
    if (calculateWinner(board) || board[i]) {
      return;
    }
    
    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    const winner = calculateWinner(board);
    
    // Update scores
    if (winner && winner !== 'Draw') {
      setScores(prev => ({ ...prev, [winner]: prev[winner] + 1 }));
    } else if (winner === 'Draw') {
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
    
    // Save game history
    if (winner) {
      setGameHistory(prev => [...prev, {
        board: [...board],
        winner,
        timestamp: new Date().toLocaleString()
      }]);
    }
    
    // Reset board
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (i) => {
    return (
      <button
        className="w-16 h-16 md:w-20 md:h-20 pixel-border text-3xl font-bold flex items-center justify-center bg-white hover:bg-gray-100"
        onClick={() => handleClick(i)}
      >
        {board[i]}
      </button>
    );
  };

  const winner = calculateWinner(board);
  const status = winner 
    ? winner === 'Draw' 
      ? 'Game ended in a draw!' 
      : `Winner: ${winner}`
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div>
      <h3 className="text-2xl font-bold text-center mb-6 pixel-font">❌⭕ TIC TAC TOE</h3>
      
      <div className="flex justify-between items-center mb-6">
        <div className="text-center">
          <div className="text-sm text-gray-600">X WINS</div>
          <div className="text-2xl font-bold text-blue-600">{scores.X}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">DRAWS</div>
          <div className="text-2xl font-bold text-gray-600">{scores.draws}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">O WINS</div>
          <div className="text-2xl font-bold text-red-600">{scores.O}</div>
        </div>
      </div>

      <div className="text-center mb-4">
        <div className={`text-lg font-bold ${winner === 'X' ? 'text-blue-600' : winner === 'O' ? 'text-red-600' : 'text-gray-800'}`}>
          {status}
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <div className="grid grid-cols-3 gap-2">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button 
          className="pixel-button bg-blue-600 text-white px-6 py-2 hover:bg-blue-700"
          onClick={resetGame}
          disabled={!winner && !board.includes(null)}
        >
          {winner || !board.includes(null) ? 'NEW GAME' : 'RESTART'}
        </button>
      </div>

      {gameHistory.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-bold mb-2">Game History</h4>
          <div className="max-h-40 overflow-y-auto">
            {gameHistory.map((game, index) => (
              <div key={index} className="text-sm mb-1 p-2 bg-gray-100 pixel-border">
                Game {index + 1}: {game.winner === 'Draw' ? 'Draw' : `${game.winner} won`} - {game.timestamp}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default GameMenu;