import * as React from "react";
import { FC } from "react";
import Square from "./square";

//board
type oneSquareType = "O" | "X" | null;
interface boardProps {
  squares: Array<oneSquareType>;
  onClick: (i: number) => void;
  SIZE: number;
}
const Board: FC<boardProps> = (props) => {
  const renderSquare = (i: number) => {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  };
  const renderSquares = (n: number) => {
    const list: JSX.Element[] = [];
    for (let f0 = 0; f0 < n; f0++) {
      list.push(<div className="board-row">{renderRow(f0, n)}</div>);
    }
    return list;
  };

  const renderRow = (rowCount: number, maxColumnCount: number) => {
    const rowList: JSX.Element[] = [];
    for (let f1: number = 0; f1 < maxColumnCount; f1++) {
      const squareNumber: number = rowCount * props.SIZE + f1;
      rowList.push(renderSquare(squareNumber));
    }
    return rowList;
  };

  return <div>{renderSquares(props.SIZE)}</div>;
};

export default Board;
