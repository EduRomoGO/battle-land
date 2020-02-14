import React, { useEffect } from 'react';
import './Draw.css';
import anime from 'animejs/lib/anime.es.js';

export const Draw = ({className, isDraw, hasGameStarted}) => {
  const getClassName = () => `c-draw ${className}`;

  return <div className={getClassName()}>{(hasGameStarted && isDraw) ? 'Draw' : ''}</div>;
}

export const DrawWithAnimation = (props) => {
  useEffect(() => {
    anime({
      targets: '.draw-animation',
      delay: 700,
      opacity: [0, 1],
    });
  });

  return <Draw className='draw-animation' {...props} />
};
