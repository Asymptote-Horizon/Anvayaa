import React, { useState, useEffect } from "react";
import { Brain, RotateCcw } from "lucide-react";

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const EMOJIS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const initializeGame = () => {
    const shuffledEmojis = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);
    setCards(
      shuffledEmojis.map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }))
    );
    setFlippedIndices([]);
    setMoves(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (
      flippedIndices.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);
    
    // Update card to be flipped
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    if (newFlippedIndices.length === 2) {
      setMoves(moves + 1);
      const firstIndex = newFlippedIndices[0];
      const secondIndex = newFlippedIndices[1];

      if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
        // Match!
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstIndex].isMatched = true;
          matchedCards[secondIndex].isMatched = true;
          matchedCards[firstIndex].isFlipped = false;
          matchedCards[secondIndex].isFlipped = false;
          setCards(matchedCards);
          setFlippedIndices([]);
        }, 1000); // 1 second delay
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstIndex].isFlipped = false;
          resetCards[secondIndex].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  const isWin = cards.every(card => card.isMatched) && cards.length > 0;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-[var(--border)] overflow-hidden flex flex-col items-center p-6">
      <div className="w-full flex justify-between items-center mb-6 border-b border-[var(--border)] pb-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Brain className="w-6 h-6" />
          Memory Match
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-lg font-medium opacity-80">
            Moves: <span className="font-bold text-xl">{moves}</span>
          </div>
          {isWin && <span className="text-green-500 font-bold ml-4">You Win!</span>}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6">
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(index)}
            disabled={card.isFlipped || card.isMatched || flippedIndices.length === 2}
            className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center text-3xl sm:text-4xl transition-all duration-300 transform preserve-3d
              ${card.isFlipped || card.isMatched 
                  ? 'bg-indigo-100 dark:bg-indigo-900/40 rotate-y-180' 
                  : 'bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600'
              }
              ${card.isMatched ? 'opacity-50 scale-95 ring-2 ring-green-400 dark:ring-green-500' : 'shadow-md'}
            `}
          >
            {(card.isFlipped || card.isMatched) && (
              <span className="animate-fade-in">{card.emoji}</span>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={initializeGame}
        className="px-6 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 dark:bg-indigo-900/40 dark:hover:bg-indigo-800/60 dark:text-indigo-300 font-semibold rounded-lg flex items-center gap-2 transition-colors"
      >
        <RotateCcw className="w-5 h-5" /> Refresh Game
      </button>
    </div>
  );
}
