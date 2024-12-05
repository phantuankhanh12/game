import { createStore } from "redux";

// Actions
const MAKE_MOVE = "MAKE_MOVE";
const RESET_GAME = "RESET_GAME";

// Action creators
export const makeMove = (index, player) => ({
  type: MAKE_MOVE,
  payload: { index, player },
});

export const resetGame = () => ({
  type: RESET_GAME,
});

// Reducer
const initialState = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  winner: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_MOVE:
      const newBoard = [...state.board];
      newBoard[action.payload.index] = action.payload.player;
      const winner = calculateWinner(newBoard);
      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === "X" ? "O" : "X",
        winner,
      };
    case RESET_GAME:
      return initialState;
    default:
      return state;
  }
};

// Utility function to check for winner
const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const store = createStore(reducer);

export default store;
