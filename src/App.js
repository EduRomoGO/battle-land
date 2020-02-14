import React from 'react';
import './App.css';
import './reset.css';
import Dice from './components/Dice/Dice.js';
import Fighter from './components/Fighter/Fighter.js';

function App() {
  return (
    <div className="App">
      <Fighter />
      <Dice value={3} />
    </div>
  );
}

export default App;
