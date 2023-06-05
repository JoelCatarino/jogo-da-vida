import { useState, useEffect } from 'react';
// import './App.css';

const WIDTH = 10;
const HEIGHT = 10;

const App = () => {
  const [grid, setGrid] = useState([]);
  
  useEffect(() => {
    initializeGrid();
  }, []);
  
  const initializeGrid = () => {
    const newGrid = [];
    for (let i = 0; i < HEIGHT; i++) {
      const row = [];
      for (let j = 0; j < WIDTH; j++) {
        row.push(false);
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  };
  
  const toggleCell = (row, col) => {
    const newGrid = [...grid];
    newGrid[row][col] = !newGrid[row][col];
    setGrid(newGrid);
  };
  
  const calculateNextGeneration = () => {
    const newGrid = [];
    for (let i = 0; i < HEIGHT; i++) {
      const row = [];
      for (let j = 0; j < WIDTH; j++) {
        const aliveNeighbors = countAliveNeighbors(i, j);
        if (grid[i][j]) {
          row.push(aliveNeighbors === 2 || aliveNeighbors === 3);
        } else {
          row.push(aliveNeighbors === 3);
        }
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  };
  
  const countAliveNeighbors = (row, col) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const neighborRow = row + i;
        const neighborCol = col + j;
        if (
          neighborRow >= 0 &&
          neighborRow < HEIGHT &&
          neighborCol >= 0 &&
          neighborCol < WIDTH &&
          grid[neighborRow][neighborCol]
        ) {
          count++;
        }
      }
    }
    return count;
  };
  
  const renderGrid = () => {
    return grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <div
          key={`${rowIndex}-${colIndex}`}
          className={`cell ${cell ? 'alive' : ''}`}
          onClick={() => toggleCell(rowIndex, colIndex)}
        />
      ))
    );
  };
  
  return (
    <div className="App">
      <h1>Jogo da Vida de Conway</h1>
      <div className="grid">{renderGrid()}</div>
      <button onClick={calculateNextGeneration}>Próxima Geração</button>
    </div>
  );
};

export default App;
