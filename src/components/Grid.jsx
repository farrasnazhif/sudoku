import classNames from "classnames";

const Grid = ({
  board,
  puzzle,
  selected,
  setSelected,
  handleInput,
  greenCells,
  solution,
}) => {
  const selectedValue =
    selected.length === 2 ? board[selected[0]][selected[1]] : null;

  const isConflict = (rIdx, cIdx, value) => {
    if (!value) return false;
    // initial puzzles aren't affected
    if (puzzle[rIdx][cIdx] !== null) return false;

    // check all row values
    const rowConflict = board[rIdx].some(
      // idx !== cIdx, doesn't check the column
      // cell === value, check if cell = value in the current row
      (cell, idx) => idx !== cIdx && cell === value
    );

    // only check the column based on the row
    const colConflict = board.some(
      // idx !== rIdx, doesn't check the row
      // row[cIdx] === value, check if theres duplicate value in the current col
      (row, idx) => idx !== rIdx && row[cIdx] === value
    );

    // if the value doesn't match with the solution
    const wrongValue = value !== solution[rIdx][cIdx];

    return rowConflict || colConflict || wrongValue;
  };

  return (
    <div className="grid-container">
      <table className="grid-table">
        <tbody>
          {board.map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((cell, cIdx) => {
                const isPrefilled = puzzle[rIdx][cIdx] !== null;
                const cellIndex = rIdx * 9 + cIdx;
                const conflict = isConflict(rIdx, cIdx, cell);

                return (
                  <td
                    key={cIdx}
                    className={classNames("cell", {
                      "same-row": selected && rIdx === selected[0],
                      "same-col": selected && cIdx === selected[1],
                      "same-box":
                        selected &&
                        Math.floor(rIdx / 3) === Math.floor(selected[0] / 3) &&
                        Math.floor(cIdx / 3) === Math.floor(selected[1] / 3),
                      "same-value":
                        selectedValue !== null && cell === selectedValue,
                      green: cellIndex < greenCells,
                    })}
                  >
                    <input
                      type="text"
                      maxLength={1}
                      value={cell ?? ""}
                      readOnly={isPrefilled}
                      className={classNames({ invalid: conflict })}
                      onFocus={() => setSelected([rIdx, cIdx])}
                      onClick={() => setSelected([rIdx, cIdx])}
                      onChange={(event) => {
                        handleInput(rIdx, cIdx, event.target.value);
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
