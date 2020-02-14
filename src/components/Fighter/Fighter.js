import React, { useEffect, useRef } from 'react';
import DiceWithAnimations from '../Dice/DiceWithAnimations.js';
import './Fighter.css';
import { ReactComponent as HealthSvg } from './Health.svg';
import anime from 'animejs/lib/anime.es.js';
import { AnimateOnChange } from 'react-animation';

const getAvatar = type => type === 'monster' ? '🧟‍♂️' : '🧙‍♂️';

const getDmgTaken = dmg => dmg ? `- ${dmg}` : '';
const getTotalAttackValue = (hasGameStarted, attack) => hasGameStarted ? attack.reduce((total, next) => total + next, 0) : '?';

const getClassName = position => `c-fighter__attributes c-fighter__attributes__${position}`;

const getHealthSvgStyle = (initialHealth, currentHealth) => {
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

const Fighter = ({ type, className, initialHealth, currentHealth, dmg, attack = [undefined, undefined], hasGameStarted, position, animationDelay }) => {
  useEffect(() => {
    const healthRefCurrent = healthRef.current;

    const animateDmg = () => {
      anime.timeline()
        .add({
          targets: '.dmg-taken',
          duration: 600,
          opacity: [0, 1],
          translateY: [30, 0],
        }, animationDelay)
        .add({
          targets: '.dmg-taken',
          duration: 600,
          opacity: [1, 0],
          translateY: [0, -30],
          begin: () => {
            const healthStyle = getHealthSvgStyle(initialHealth, currentHealth);

            healthRefCurrent.style.strokeDasharray = healthStyle.strokeDasharray;
            healthRefCurrent.style.strokeDashoffset = healthStyle.strokeDashoffset;
          },
        });
    };

    if (dmg > 0) {
      animateDmg();
    }

    if (!hasGameStarted) {
      const healthStyle = getHealthSvgStyle(initialHealth, currentHealth);

      healthRefCurrent.style.strokeDasharray = healthStyle.strokeDasharray;
      healthRefCurrent.style.strokeDashoffset = healthStyle.strokeDashoffset;
    }
  });
  const healthRef = useRef();

  return <section className={`c-fighter ${className} component-wrapper`}>
    <div className='dmg-taken'>{getDmgTaken(dmg)}</div>
    <div className={getClassName(position)}>
      <div className='c-fighter__health-avatar-wrapper'>
        <HealthSvg ref={healthRef} className='c-fighter-health-svg' tabIndex='0' />
        <div className='c-fighter__avatar'>{getAvatar(type)}</div>
      </div>
      <div className='c-fighter__die-wrapper'>
        {attack.map((result, id) => <DiceWithAnimations key={id} value={result} />)}
      </div>
      <AnimateOnChange style={{ display: 'flex' }} durationOut={500}>
        <div className='c-fighter__total-attack'>{getTotalAttackValue(hasGameStarted, attack)}</div>
      </AnimateOnChange>
    </div>
  </section>;
};

export default Fighter;
