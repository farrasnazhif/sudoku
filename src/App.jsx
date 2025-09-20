import React from "react";
import "./App.css";
import Grid from "./components/Grid";
import { range } from "./utils";
import Controls from "./components/Controls";

// set all board/puzzle with null value
const emptyValue = () => range(9).map(() => range(9).map(() => null));

function App() {
  // puzzle from sudoku api
  const [puzzle, setPuzzle] = React.useState(emptyValue);
  // board value from user input
  const [board, setBoard] = React.useState(emptyValue);
  // solution
  const [solution, setSolution] = React.useState(emptyValue);
  // status
  const [status, setStatus] = React.useState("");

  // [row, col]
  const [selected, setSelected] = React.useState([]);

  // green cells correct status
  const [greenCells, setGreenCells] = React.useState(0);

  const handleCheck = () => {
    const flatBoard = board.flat();
    const flatSolution = solution.flat();

    if (flatBoard.every((cell, index) => cell === flatSolution[index])) {
      setStatus("Correct!");

      let count = 0;
      const totalCells = 81;
      const interval = setInterval(() => {
        count++;
        setGreenCells(count);
        if (count === totalCells) clearInterval(interval);
      }, 30);
    } else {
      setStatus("Incorrect, try again");
    }
  };

  const handleReset = () => {
    setBoard(emptyValue);
    setStatus("");
    setSelected([]);
  };

  const handleNewPuzzle = () => {};

  // handle user input
  const handleInput = (rIdx, cIdx, value) => {
    if (value === "" || (value >= 1 && value <= 9)) {
      setBoard((prev) =>
        prev.map((row, r) =>
          row.map((cell, c) => {
            if (r === rIdx && c === cIdx) {
              return value ? parseInt(value) : null;
            }

            return cell;
          })
        )
      );
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>SUDOKU</h1>
      <Grid
        selected={selected}
        setSelected={setSelected}
        board={board}
        puzzle={puzzle}
        handleInput={handleInput}
        greenCells={greenCells}
      />
      <Controls
        handleCheck={handleCheck}
        handleReset={handleReset}
        handleNewPuzzle={handleNewPuzzle}
      />
      {status && <div className="status">{status}</div>}
    </div>
  );
}

export default App;
