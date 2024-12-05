import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeMove, resetGame } from "../redux/store";

const Game = () => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const currentPlayer = useSelector((state) => state.currentPlayer);
  const winner = useSelector((state) => state.winner);

  const handleClick = (index) => {
    if (board[index] || winner) return; // Không làm gì nếu ô đã có dấu X hoặc O hoặc đã có người thắng
    dispatch(makeMove(index, currentPlayer));
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const renderBoard = () => {
    return (
      <div className="board">
        {board.map((_, index) => (
          <div key={index}>{renderSquare(index)}</div>
        ))}
      </div>
    );
  };

  const renderStatus = () => {
    if (winner) {
      return <h2>Winner: {winner}</h2>;
    }
    return <h2>Next Player: {currentPlayer}</h2>;
  };

  const handleReset = () => {
    dispatch(resetGame());
  };

  useEffect(() => {
    // AI logic (minimax algorithm) for AI's turn (player 'O')
    if (currentPlayer === "O" && !winner) {
      const bestMove = getBestMove(board);
      dispatch(makeMove(bestMove, "O"));
    }
  }, [currentPlayer, board, winner, dispatch]);

  const getBestMove = (board) => {
    const emptySquares = board
      .map((val, index) => (val === null ? index : null))
      .filter((val) => val !== null);
    const randomMove =
      emptySquares[Math.floor(Math.random() * emptySquares.length)];
    return randomMove;
  };

  return (
    <div className="game">
      {renderStatus()}
      {renderBoard()}
      <button onClick={handleReset}>Reset Game</button>
    </div>
  );
};

export default Game;
