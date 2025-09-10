import { range } from "../utils";

const Grid = () => {
  return (
    <div className="grid-container">
      <table className="grid-table">
        <tbody>
          {range(9).map((row) => (
            <tr key={row}>
              {range(9).map((col) => (
                <td key={col} className="col-cell">
                  <input type="text" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
