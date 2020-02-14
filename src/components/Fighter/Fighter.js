import React from 'react';
import Dice from '../Dice/Dice';
import './Fighter.css';

const Fighter = ({ type, currentHealth, attack = [undefined, undefined] }) => {

  const getAvatar = type => type === 'monster' ? '🧟‍♂️' : '🧙‍♂️';

  return <section className='c-fighter'>
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
