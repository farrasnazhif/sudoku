const Controls = ({ handleReset, handleNewPuzzle }) => {
  return (
    <div style={{ marginTop: 16 }}>
      <button onClick={handleReset} style={{ marginRight: 8 }}>
        Reset
      </button>
      <button onClick={handleNewPuzzle}>New Puzzle</button>
    </div>
  );
};

export default Controls;
