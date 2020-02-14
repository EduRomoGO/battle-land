import React from 'react';

const Dice = ({ value = '?' }) => {
  const isValidDiceNumber = value => parseInt(value, 10) <= 6 && parseInt(value, 10) >= 1;
  const isValid = value => isValidDiceNumber(value) || value === '?';
  const getValue = value => {
    return isValid(value) ? value : 'An error occurred';
  }

  return <div className='c-dice component-wrapper'>
      <div className='js-value'>{getValue(value)}</div>
  </div>
};

export default Dice;
