import { range } from "../utils";

const Grid = () => {
  return (
    <div className="container">
      <table className="table">
        <tbody>
          {range(9).map((row) => (
            <tr key={row}>
              {range(9).map((col) => (
                <td key={col}>
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
