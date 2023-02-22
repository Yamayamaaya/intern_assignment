import React, { useReducer } from "react";
import Board from "./board";

type State = {
  history: [{ squares: oneSquareType[] }];
  stepNumber: number;
  xIsNext: boolean;
};

type ForReducer = {
  mode: "handleClick" | "jumpTo";
  i: number;
};

const initialState: State = {
  history: [{ squares: Array<oneSquareType>(9).fill(null) }],
  stepNumber: 0,
  xIsNext: true,
};

const reducer = (state: State, f: ForReducer): State => {
  switch (f.mode) {
    case "handleClick":
      const historySlice = state.history.slice(
        0,
        state.stepNumber + 1
      ) as State["history"];
      const current = historySlice[historySlice.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[f.i]) {
        return state;
      }
      squares[f.i] = state.xIsNext ? "X" : "O";
      console.log(historySlice.concat([{ squares: squares }]));
      return {
        history: historySlice.concat([
          { squares: squares },
        ]) as State["history"],
        stepNumber: historySlice.length,
        xIsNext: !state.xIsNext,
      };
    case "jumpTo":
      return {
        history: state.history,
        stepNumber: f.i,
        xIsNext: f.i % 2 === 0,
      };
    default:
      return state;
  }
};

const Game = () => {
  const [state, dispatch_ox] = useReducer(reducer, initialState);
  const current = state.history[state.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = state.history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => dispatch_ox({ mode: "handleClick", i: move })}>
          {desc}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (state.xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => dispatch_ox({ mode: "jumpTo", i: i })}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

type oneSquareType = "O" | "X" | null;

const calculateWinner = (squares: Array<oneSquareType>) => {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;
