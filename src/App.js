import React from 'react';
import './App.css';
import './reset.css';
import './buttons.css';
import Game from './components/Game/Game.js';

function App() {
  return (
    <div className="App">
      <header>
        <h1 className='title'>Battle Land</h1>
      </header>
      <Game />
    </div>
  );
}

export default App;
