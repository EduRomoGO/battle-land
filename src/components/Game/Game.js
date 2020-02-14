import React, { useState, useEffect, useRef } from 'react';
import Fighter from '../Fighter/Fighter.js';
import { DrawWithAnimation } from '../Draw/Draw.js';
import './Game.css';
import anime from 'animejs/lib/anime.es.js';

const initialHealth = 1;
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

const hasGameFinished = ({ monster, character }) => !monster.health || !character.health;
const hasGameStarted = ({ monster, character }) => monster.attack && character.attack;

const isAttackDraw = ({ monster, character }) => getAttackPoints(monster) === getAttackPoints(character);

const getDamageFor = (state, fighter) => getDmgResults(state)[fighter];

const getInitialHealth = (type) => initialState[type].health;

const determineWinner = ({ monster }) => !monster.health ? 'character' : 'monster';
const determineAttacker = ({ monster, character }) => {
  return (getAttackPoints(monster) > getAttackPoints(character)) ? 'monster' : 'character';
};

const getFighterPosition = type => type === 'character' ? 'left' : 'right';


const Game = () => {
  const [state, setState] = useState(initialState);
  const bFightersRef = useRef(null);
  const attackButtonRef = useRef(null);
  useEffect(() => {
    const bFightersRefCurrent = bFightersRef.current;
    const attackButtonRefCurrent = attackButtonRef.current;

    if (!isAttackDraw(state)) {
      const attacker = determineAttacker(state);
      const attackerClass = `.c-fighter-${attacker}`;

      const getDistanceFromSide = ({left: nodeLeft, right: nodeRight, movingNodePosition}) => {
        let distance;

        if (movingNodePosition === 'right') {
          distance = nodeRight.offsetLeft - nodeRight.offsetWidth - nodeLeft.offsetLeft;
        } else {
          distance = nodeRight.offsetLeft - nodeLeft.offsetWidth - nodeLeft.offsetLeft
        }

        return distance;
      }

      const animateAttacker = attacker => {
        const positionNodeMap = {
          [getFighterPosition('character')] : document.querySelector('.c-fighter-character'),
          [getFighterPosition('monster')] : document.querySelector('.c-fighter-monster'),
        }

        const distance = getDistanceFromSide({...positionNodeMap, movingNodePosition: getFighterPosition(attacker)});

        const getAttackMovementValues = (position) => {
          return position === 'right' ? [0, -distance] : [0, distance];
        };
        const getRetreatMovementValues = (position) => {
          return position === 'right' ? [-distance, 0] : [distance, 0];
        };

        if (attackButtonRefCurrent) {
          attackButtonRefCurrent.disabled = true;
        }

        return anime.timeline()
          .add({
            targets: attackerClass,
            translateX: getAttackMovementValues(getFighterPosition(attacker)),
            opacity: 1,
            duration: 500,
            // elasticity: 100,
          }, 1800)
          .add({
            targets: attackerClass,
            translateX: getRetreatMovementValues(getFighterPosition(attacker)),
            opacity: 1,
            duration: 500,
            complete: () => {
              if (attackButtonRefCurrent) {
                attackButtonRefCurrent.disabled = false;
              }
            }
          });
      };

      if (hasGameFinished(state)) {
        animateAttacker(attacker)
          .add({
            targets: '.b-winner',
            opacity: [0, 1],
            begin: () => {
              attackButtonRefCurrent.classList.add('hidden');
              bFightersRefCurrent.classList.add('b-fighters--blur');
            },
            easing: 'easeInOutQuad',
          })
          .add({
            targets: '.b-winner__msg',
            opacity: [0, 1],
            fontSize: ['1rem', '5rem'],
            easing: 'easeInOutQuad',
          })
          .add({
            targets: '.b-winner__play-again',
            opacity: [0, 1],
            easing: 'easeInOutQuad',
          }, '+=200');
      } else {
        animateAttacker(attacker);
      }
    }

    return () => {
      attackButtonRefCurrent.classList.remove('hidden');
      bFightersRefCurrent.classList.remove('b-fighters--blur');
    }
  });

  const handleAttackClick = () => {
    setState(state => {
      const newState = {
        monster: { attack: [getDiceFace(), getDiceFace()] },
        character: { attack: [getDiceFace(), getDiceFace()] },
      };
      const dmgResults = getDmgResults(newState);

      newState.character.health = Math.max(state.character.health - dmgResults.character, 0);
      newState.monster.health = Math.max(state.monster.health - dmgResults.monster, 0);

      return newState;
    });
  };


  const renderAttackButton = () => {
    return <button ref={attackButtonRef} className='button button--salmon button--big-font' onClick={handleAttackClick}>Attack</button>;
  };

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
    <section ref={bFightersRef} className='b-fighters'>
      {renderFighter('character')}
      <DrawWithAnimation hasGameStarted={hasGameStarted(state)} isDraw={isAttackDraw(state)} />
      {renderFighter('monster')}
    </section>
  </section>
};

export default Game;
