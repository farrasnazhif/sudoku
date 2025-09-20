import React from "react";
import "./App.css";
import Grid from "./components/Grid";
import { range } from "./utils";

// set all board will null value
const emptyBoard = () => range(9).map(() => range(9).map(() => null));

function App() {
  // puzzle for the api
  const [puzzle, setPuzzle] = React.useState(emptyBoard);
  // board value from user input
  const [board, setBoard] = React.useState(emptyBoard);

  // [row, col]
  const [selected, setSelected] = React.useState(null);

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
      />
    </div>
  );
}

export default App;
