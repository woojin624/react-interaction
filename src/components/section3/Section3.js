import React, { useState } from 'react';
import Canvas from './Canvas';
import { useTransition, animated } from 'react-spring';
import './Section3.css';

const Section3 = () => {
  const [items, setItems] = useState([]);
  const transition = useTransition(items, {
    from: { x: -100, y: 800, opacity: 0, width: 10, height: 10 },
    enter: (item) => async (next) => {
      await next({ y: item.y, opacity: 1, delay: item.delay });
      await next({ x: 0, width: 100, height: 100 });
    },
    leave: { x: 100, y: 800, opacity: 0 },
  });
  return (
    <div className='section-3'>
      <button
        onClick={() => {
          setItems((v) =>
            v.length
              ? []
              : [
                  { y: -100, delay: 200 },
                  { y: 0, delay: 400 },
                  { y: 100, delay: 600 },
                ]
          );
          //
        }}
      >
        {items.length ? 'un-mount' : 'mount'}
      </button>
      <div className='section3-container'>
        {/*  */}
        {transition((style, item) => (item ? <animated.div style={style} className='sitem' /> : ''))}
      </div>
    </div>
  );
};

export default Section3;
