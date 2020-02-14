import React from 'react';
import Dice from '../Dice/Dice';
import './Fighter.css';

const getAvatar = type => type === 'monster' ? '🧟‍♂️' : '🧙‍♂️';

const getDmgTaken = dmg => dmg ? `- ${dmg}` : '';
const getTotalAttackValue = (hasGameStarted, attack) => hasGameStarted ? attack.reduce((total, next) => total + next, 0) : '?';

const getClassName = position => `c-fighter__attributes c-fighter__attributes__${position}`;


const Fighter = ({ type, currentHealth, dmg, attack = [undefined, undefined], hasGameStarted, position }) => {
  return <section className='c-fighter component-wrapper'>
    <div className='dmg-taken'>{getDmgTaken(dmg)}</div>
    <div className={getClassName(position)}>
    <div className='c-fighter__health-avatar-wrapper'>
        <div className='c-fighter__health'>{currentHealth}</div>
        <div className='c-fighter__avatar'>{getAvatar(type)}</div>
      </div>
      <div className='c-fighter__dice-wrapper'>
        {attack.map((result, id) => <Dice key={id} value={result} />)}
      </div>
      <div className='c-fighter__total-attack'>{getTotalAttackValue(hasGameStarted, attack)}</div>
    </div>
  </section>;
};

export default Fighter;
