import React from 'react';
import { AnimateOnChange } from 'react-animation';

export default (animationIn, animationOut) => {
  return (AnimatedComponent) => (props) => {
    return <AnimateOnChange animationIn={animationIn} animationOut={animationOut}>
       <AnimatedComponent {...props} />
    </AnimateOnChange>;
  };
};
