import classNames from "classnames";

const Grid = ({ board, puzzle, selected, setSelected, handleInput }) => {
  return (
    <div className="grid-container">
      <table className="grid-table">
        <tbody>
          {/* map board by row and each cell in the row */}
          {board.map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((cell, cIdx) => {
                const isPrefilled = puzzle[rIdx][cIdx] !== null;
                const isSelected =
                  selected && rIdx === selected[0] && cIdx === selected[1];

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
                      selected: isSelected,
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
