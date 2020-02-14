import React from 'react';
import './App.css';
import './reset.css';
import Dice from './components/Dice/Dice.js';

function App() {
  return (
    <div className="App">
      <Dice value={3} />
    </div>
  );
}

export default App;
