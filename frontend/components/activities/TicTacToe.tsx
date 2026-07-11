import React, { useState } from "react";
import { RotateCcw, Swords } from "lucide-react";

export default function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);
  
  const handleClick = (i: number) => {
    if (board[i] || winner) return;

    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-[var(--border)] overflow-hidden flex flex-col items-center p-6">
      <div className="w-full flex justify-between items-center mb-6 border-b border-[var(--border)] pb-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Swords className="w-6 h-6" />
          Tic-Tac-Toe
        </h2>
        <div className="text-lg font-medium">
          {winner ? (
            <span className="text-green-500 font-bold">Winner: {winner}</span>
          ) : isDraw ? (
            <span className="text-yellow-500 font-bold">Draw!</span>
          ) : (
            <span className="opacity-80">Next player: <span className="font-bold text-xl">{xIsNext ? "X" : "O"}</span></span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 bg-gray-200 dark:bg-slate-700 p-2 rounded-xl shadow-inner mb-6">
        {board.map((square, i) => (
          <button
            key={i}
            className={`w-20 h-20 md:w-24 md:h-24 bg-white dark:bg-slate-800 rounded-lg text-4xl font-bold flex items-center justify-center transition-colors shadow-sm
              ${!square && !winner ? 'hover:bg-indigo-50 dark:hover:bg-slate-700' : ''}
              ${square === 'X' ? 'text-indigo-500' : 'text-pink-500'}`}
            onClick={() => handleClick(i)}
            disabled={!!square || !!winner}
          >
            {square}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="px-6 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 dark:bg-indigo-900/40 dark:hover:bg-indigo-800/60 dark:text-indigo-300 font-semibold rounded-lg flex items-center gap-2 transition-colors"
      >
        <RotateCcw className="w-5 h-5" /> Reset Game
      </button>
    </div>
  );
}
