import React from 'react';
import './Draw.css';

export const Draw = ({isDraw}) => {
  return <div className='c-draw'>{isDraw ? 'Draw' : ''}</div>;
}
