import React, { useState, useEffect } from 'react';

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

export default MemoryMatchGame;