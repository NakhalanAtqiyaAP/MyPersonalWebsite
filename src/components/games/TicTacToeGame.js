import React, { useState } from 'react';

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

export default TicTacToeGame;