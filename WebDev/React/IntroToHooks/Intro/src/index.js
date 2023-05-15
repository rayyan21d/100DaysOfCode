import React from "react";
import ReactDOM from "react-dom";

var count = 0;

function clickIf() {
  count++;
  console.log(count);
}

ReactDOM.render(
  <div className="container">
    <h1>0</h1>
    <button onClick={clickIf}>+</button>
  </div>,
  document.getElementById("root")
);
