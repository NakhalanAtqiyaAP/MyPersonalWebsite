import React, { useState } from 'react';

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

export default ReactionTestGame;