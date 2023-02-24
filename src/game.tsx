import React, { useReducer, useState } from "react";
import Board from "./board";

type State = {
  history: [{ squaresRecord: oneSquareType[] }];
  stepNumber: number;
  xIsNext: boolean;
};

type ForReducer = {
  mode: "handleClick" | "jumpTo";
  i: number;
};
const masterSize: number = 5;
const initialState: State = {
  history: [
    { squaresRecord: Array<oneSquareType>(masterSize * masterSize).fill(null) },
  ],
  stepNumber: 0,
  xIsNext: true,
};

// const ControlledForm = () => {
//   const [inputSize, SetInputSize] = useState<number>(0);
//   const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     // SetInputSize(event.target.value);
//     console.log(event.target.value);
//   };
//   const handleSubmit = () => {
//     console.log(inputSize);
//   };
//   return (
//     <div>
//       <input type="number" value={inputSize} onChange={handleNameChange} />
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

const reducer = (state: State, f: ForReducer): State => {
  switch (f.mode) {
    case "handleClick":
      const historySlice = state.history.slice(
        0,
        state.stepNumber + 1
      ) as State["history"];
      const currentForReducer = historySlice[historySlice.length - 1];
      const squares = currentForReducer.squaresRecord.slice();
      if (calculateWinner(squares) || squares[f.i]) {
        return state;
      }
      squares[f.i] = state.xIsNext ? "X" : "O";
      // console.log(historySlice.concat([{ squaresRecord: squares }]));
      // console.log(
      //   state.stepNumber + "state.stepNumberのデバッグログinりでゅーさー"
      // );
      return {
        history: historySlice.concat([
          { squaresRecord: squares },
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
  // console.log(state);
  // console.log("↑stateのデバッグログ");
  // console.log(state.stepNumber + "state.stepNumberのデバッグログ");
  // console.log(state.history);
  // console.log("↑state.historyのデバッグログ");
  const current = state.history[state.stepNumber];
  // console.log(current);
  console.log(current.squaresRecord);
  console.log("---------------------------------------------------------");
  const winner = calculateWinner(current.squaresRecord);
  const moves = state.history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={(i) => dispatch_ox({ mode: "jumpTo", i: move })}>
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
          squares={current.squaresRecord}
          onClick={(i) => dispatch_ox({ mode: "handleClick", i: i })}
          SIZE={masterSize}
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

const calculateWinner = (squaresResult: Array<oneSquareType>) => {
  const lineList: number[][] = [];
  for (let f = 0; f < masterSize; f++) {
    let addList0: number[] = [];
    let addList1: number[] = [];
    let addList2: number[] = [];
    let addNumber1: number = f * masterSize;
    for (let f1 = f; f1 < masterSize + f; f1++) {
      let addNumber0: number = 0;
      addNumber0 = f + (f1 - f) * masterSize;
      addList0.push(addNumber0);
      addList1.push(addNumber1);
      if (f === 0) {
        addList2.push(addNumber1 + addNumber0);
      }
      if (f === masterSize - 1) {
        addList2.push(masterSize - 1 + (f1 - f) * (masterSize - 1));
      }
      if (addList2.length === masterSize) {
        // console.log(addList2);
        // console.log("↑2----------------");
        lineList.push(addList2);
      }
      addNumber1 = addNumber1 + 1;
    }
    // console.log(addList0);
    // console.log("↑0----------------");
    // console.log(addList1);
    // console.log("↑1----------------");
    lineList.push(addList0);
    lineList.push(addList1);

    // lineList.push([f, f + masterSize, f + masterSize * 2]);
  }
  console.log(lineList);
  for (let i = 0; i < lineList.length; i++) {
    let LineResult: oneSquareType[] = [];
    for (let f2 = 0; f2 < masterSize; f2++) {
      // console.log(lineList[i]);
      // console.log(squaresResult);
      LineResult.push(squaresResult[lineList[i][f2]]);
    }
    const thisLineResult: oneSquareType[] = [...new Set(LineResult)];
    console.log(LineResult, i);
    if (thisLineResult.length === 1 && thisLineResult[0] != null) {
      return thisLineResult[0];
    }
  }
  return null;
};

export default Game;
