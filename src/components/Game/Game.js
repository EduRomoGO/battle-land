import React, { useState } from 'react';
import Fighter from '../Fighter/Fighter.js';
import { DrawWithAnimation } from '../Draw/Draw.js';
import './Game.css';

const initialHealth = 12;
const initialState = {
  monster: { health: initialHealth, attack: undefined },
  character: { health: initialHealth, attack: undefined },
};

// const dice = [1];
const dice = [1, 2, 3, 4, 5, 6];
const getDiceFace = () => Math.floor(Math.random() * dice.length) + 1;

const getCurrentHealth = (state, type) => state[type].health;
const getAttack = (state, type) => state[type].attack;

const getAttackPoints = fighter => fighter.attack && fighter.attack.reduce((acc, next) => acc + next, 0);

const getDmgResults = ({ monster, character }) => {
  const monsterAttack = getAttackPoints(monster);
  const characterAttack = getAttackPoints(character);

  return {
    monster: Math.max(characterAttack - monsterAttack, 0),
    character: Math.max(monsterAttack - characterAttack, 0),
  };
};

const hasGameFinished = ({monster, character}) => !monster.health || !character.health;
const hasGameStarted = ({monster, character}) => monster.attack && character.attack;

const isAttackDraw = ({ monster, character }) => getAttackPoints(monster) === getAttackPoints(character);

const getDamageFor = (state, fighter) => getDmgResults(state)[fighter];

const getInitialHealth = (type) => initialState[type].health;

const determineWinner = ({ monster }) => !monster.health ? 'character' : 'monster';



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

  const getFighterPosition = type => type === 'character' ? 'left' : 'right';
  const renderFighter = type => {
    return <Fighter type={type} currentHealth={getCurrentHealth(state, type)} attack={getAttack(state, type)} dmg={getDamageFor(state, type)} hasGameStarted={hasGameStarted(state)} position={getFighterPosition(type)} initialHealth={getInitialHealth(type)} />;
  };

  const resetGameStatus = () => {
    setState(initialState);
  };

  const handlePlayAgainClick = () => {
    resetGameStatus();
  };

  const renderWinner = (state) => {
    if (hasGameFinished(state)) {
      const winner = determineWinner(state);
      const msg = (winner === 'monster') ? 'Game Over' : 'Victory!!';

      return <section className='b-winner'>
        <div className='b-winner__msg'>{msg}</div>
        <button className='b-winner__play-again button button--sun button--big-font' onClick={handlePlayAgainClick}>Play Again</button>
      </section>;
    }
  };

  return <section className='c-game'>
    {renderWinner(state)}
    <div className='c-game__actions'>{renderAttackButton()}</div>
    <section className='b-fighters'>
      {renderFighter('character')}
      <DrawWithAnimation hasGameStarted={hasGameStarted(state)} isDraw={isAttackDraw(state)} />
      {renderFighter('monster')}
    </section>
  </section>
};

export default Game;
