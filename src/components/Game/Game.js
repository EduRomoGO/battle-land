import React, { useState } from 'react';
import Fighter from '../Fighter/Fighter';

const initialHealth = 12;
const initialState = {
  monster: { health: initialHealth, attack: undefined },
  character: { health: initialHealth, attack: undefined },
};

const getCurrentHealth = (type, state) => state[type].health;

const Game = () => {
  const [state, setState] = useState(initialState);

  return <section className='c-game'>
    <Fighter type='character' currentHealth={getCurrentHealth('character', state)} />
    <Fighter type='monster' currentHealth={getCurrentHealth('monster', state)} />
  </section>
};

export default Game;
