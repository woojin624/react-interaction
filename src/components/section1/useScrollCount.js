// import { useCallback, useEffect, useRef } from 'react';

// const useScrollCount = (end, start = 0, duration = 3000) => {
//   const dom = useRef();
//   const stepTime = Math.abs(Math.floor(duration / (end - start))); // 1

//   const handleScroll = useCallback(([entry]) => {
//     const { current } = dom;

//     if (entry.isIntersecting) {
//       let currentNumber = start;
//       const counter = setInterval(() => {
//         currentNumber += 1;

//         if (currentNumber === end) {
//           clearInterval(counter);
//         }
//       }, stepTime);
//     }
//   }, []);

//   useEffect(() => {
//     let observer;
//     const { current } = dom;

//     if (current) {
//       observer = new IntersectionObserver(handleScroll, { threshold: 0.7 });
//       observer.observe(current);

//       return () => observer && observer.disconnect();
//     }
//   }, [handleScroll]);

//   return {
//     ref: dom,
//   };
// };

// export default useScrollCount;

import { useRef, useEffect, useCallback } from 'react';

const useScrollCount = (end, start = 0, duration = 3000, delay = 0) => {
  const element = useRef();
  const observer = useRef(null);
  const stepTime = Math.abs(Math.floor(duration / (end - start)));

  const onScroll = useCallback(
    ([entry]) => {
      const { current } = element;
      if (entry.isIntersecting) {
        let currentNumber = start;
        const counter = setInterval(() => {
          currentNumber += 1;
          current.innerHTML = currentNumber;
          if (currentNumber === end) {
            clearInterval(counter);
            observer.current.disconnect(element.current);
          }
        }, stepTime);
      }
    },
    [end, start, stepTime, element]
  );

  useEffect(() => {
    if (element.current) {
      observer.current = new IntersectionObserver(onScroll, { threshold: 0.7 });
      observer.current.observe(element.current);
    }

    return () => observer && observer.disconnect();
  }, [onScroll]);

  return {
    ref: element,
  };
};

export default useScrollCount;
