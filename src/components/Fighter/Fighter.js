import React from 'react';
import Dice from '../Dice/Dice';
import './Fighter.css';
import { ReactComponent as HealthSvg } from './Health.svg';

const getAvatar = type => type === 'monster' ? '🧟‍♂️' : '🧙‍♂️';

const getDmgTaken = dmg => dmg ? `- ${dmg}` : '';
const getTotalAttackValue = (hasGameStarted, attack) => hasGameStarted ? attack.reduce((total, next) => total + next, 0) : '?';

const getClassName = position => `c-fighter__attributes c-fighter__attributes__${position}`;

const getSvgStyle = (initialHealth, currentHealth) => {
  const radius = 52;
  const circumference = radius * 2 * Math.PI;

  const missingHealth = initialHealth - currentHealth;
  const getStrokeDashoffset = () => {
    let strokeDashoffset;

    if (currentHealth === 0) {
      strokeDashoffset = circumference;
    } else if (missingHealth === 0) {
      strokeDashoffset = 0;
    } else {
      const currentHealthPerc = (currentHealth / initialHealth) * 100;

      strokeDashoffset = circumference - (currentHealthPerc / 100) * circumference;
    }

    return strokeDashoffset;
  }

  return {
    strokeDasharray: `${circumference} ${circumference}`,
    strokeDashoffset: getStrokeDashoffset(),
  };
};

const Fighter = ({ type, initialHealth, currentHealth, dmg, attack = [undefined, undefined], hasGameStarted, position }) => {
  return <section className='c-fighter component-wrapper'>
    <div className='dmg-taken'>{getDmgTaken(dmg)}</div>
    <div className={getClassName(position)}>
      <div className='c-fighter__health-avatar-wrapper'>
        <HealthSvg style={getSvgStyle(initialHealth, currentHealth)} className='c-fighter-health-svg' tabIndex='0' />
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
