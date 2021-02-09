import React from 'react';
import './App.css';
import Tetris from "./routes/tetris/Tetris"
import Header from "./routes/tetris/Header"
function App() {
  return (
    <div className="tetris">
      <Header />
      <Tetris/>
    </div>
  );
}

export default App;
