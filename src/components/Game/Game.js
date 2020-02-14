import React, { useState } from 'react';
import Fighter from '../Fighter/Fighter.js';
import {Draw} from '../Draw/Draw.js';
import './Game.css';

const initialHealth = 12;
const initialState = {
  monster: { health: initialHealth, attack: undefined },
  character: { health: initialHealth, attack: undefined },
};

const dice = [1, 2, 3, 4, 5, 6];
const getDiceFace = () => Math.floor(Math.random() * dice.length) + 1;

const getCurrentHealth = (state, type) => state[type].health;
const getAttack = (state, type) => state[type].attack;

const getAttackPoints = fighter => fighter.attack && fighter.attack.reduce((acc, next) => acc + next, 0);

function getDmgResults({ monster, character }) {
  const monsterAttack = getAttackPoints(monster);
  const characterAttack = getAttackPoints(character);

  return {
    monster: Math.max(characterAttack - monsterAttack, 0),
    character: Math.max(monsterAttack - characterAttack, 0),
  };
};


const Game = () => {
  const [state, setState] = useState(initialState);


  const handleAttackClick = () => {
    const getNewRound = state => {
      const newState = {
        monster: { attack: [getDiceFace(), getDiceFace()] },
        character: { attack: [getDiceFace(), getDiceFace()] },
      };
      const dmgResults = getDmgResults(newState);

      newState.character.health = Math.max(state.character.health - dmgResults.character, 0);
      newState.monster.health = Math.max(state.monster.health - dmgResults.monster, 0);

      return newState;
    };

    setState(state => getNewRound(state));
  };


  const renderAttackButton = () => {
    return <button className='button button--salmon button--big-font' onClick={handleAttackClick}>Attack</button>;
  };

  return <section className='c-game'>
    <div className='c-game__actions'>{renderAttackButton()}</div>
    <section className='b-fighters'>
      <Fighter type='character' currentHealth={getCurrentHealth(state, 'character')} attack={getAttack(state, 'character')} />
      <Draw isDraw={true} />
      <Fighter type='monster' currentHealth={getCurrentHealth(state, 'monster')} attack={getAttack(state, 'monster')} />
    </section>
  </section>
};

export default Game;
