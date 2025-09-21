import React from "react";
import "./App.css";
import Grid from "./components/Grid";
import { range } from "./utils";
import Controls from "./components/Controls";
import { fetchPuzzle } from "./fetch-puzzle";

// set all board/puzzle with null value
const emptyValue = () => range(9).map(() => range(9).map(() => null));

function App() {
  // puzzle from sudoku api
  const [puzzle, setPuzzle] = React.useState(emptyValue);
  // console.log(puzzle);
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
  // fetch error
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    fetchPuzzle({
      setError,
      setStatus,
      setPuzzle,
      setSolution,
      setBoard,
      setSelected,
    });
  }, []);

  React.useEffect(() => {
    const flatBoard = board.flat();
    const flatSolution = solution.flat();

    if (
      flatBoard.every((cell, index) => cell === flatSolution[index]) &&
      solution.flat().some((v) => v !== null)
    ) {
      setStatus("Correct!");

      let count = 0;
      const totalCells = 81;
      const interval = setInterval(() => {
        count++;
        setGreenCells(count);
        if (count === totalCells) {
          return () => clearInterval(interval);
        }
      }, 30);
    }
  }, [board, solution]);

  const handleReset = () => {
    setBoard(puzzle);
    setStatus("");
    setSelected([]);
  };

  const handleNewPuzzle = () => {
    setGreenCells(0);
    fetchPuzzle({
      setError,
      setStatus,
      setPuzzle,
      setSolution,
      setBoard,
      setSelected,
    });
  };

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

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!board) {
    return <div>Loading...</div>;
  }

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
        solution={solution}
      />
      <Controls handleReset={handleReset} handleNewPuzzle={handleNewPuzzle} />
      {status && <div className="status">{status}</div>}
    </div>
  );
}

export default App;
