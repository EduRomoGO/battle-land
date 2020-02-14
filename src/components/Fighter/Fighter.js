import React from 'react';
import Dice from '../Dice/Dice';
import './Fighter.css';

const getAvatar = type => type === 'monster' ? '🧟‍♂️' : '🧙‍♂️';

const getDmgTaken = dmg => dmg ? `- ${dmg}` : '';


const Fighter = ({ type, currentHealth, dmg, attack = [undefined, undefined] }) => {
  return <section className='c-fighter'>
    <div className='dmg-taken'>{getDmgTaken(dmg)}</div>

    <div className='c-fighter__dice-wrapper'>
      {attack.map((value, id) => <Dice key={id} value={value} />)}
    </div>
    <div className='c-fighter__health-avatar-wrapper'>
      <div className='c-fighter__health'>{currentHealth}</div>
      <div className='c-fighter__avatar'>{getAvatar(type)}</div>
    </div>
  </section>
}

export default Fighter;
