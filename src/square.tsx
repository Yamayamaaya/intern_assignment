import * as React from "react";
import { FC } from "react";

type oneSquareType = "O" | "X" | null;
interface squareProps {
  value: oneSquareType;
  onClick: () => void;
}

const Square: FC<squareProps> = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Square;
