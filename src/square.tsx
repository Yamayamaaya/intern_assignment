import * as React from "react";
import { VFC } from "react";

type oneSquareType = "O" | "X" | null;
type squareProps = {
  value: oneSquareType;
  onClick: () => void;
};

const Square: VFC<squareProps> = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Square;
