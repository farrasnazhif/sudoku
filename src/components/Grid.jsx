import classNames from "classnames";

const Grid = ({
  board,
  puzzle,
  selected,
  setSelected,
  handleInput,
  greenCells,
}) => {
  console.log(selected);
  const selectedValue =
    selected.length === 2 ? board[selected[0]][selected[1]] : null;

  console.log(selectedValue);
  return (
    <div className="grid-container">
      <table className="grid-table">
        <tbody>
          {/* map board by row and each cell in the row */}
          {board.map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((cell, cIdx) => {
                const isPrefilled = puzzle[rIdx][cIdx] !== null;
                const cellIndex = rIdx * 9 + cIdx;
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
