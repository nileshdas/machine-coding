import { useState, useCallback, useRef } from "react";

const Debounce = () => {
  const [counter, setCounter] = useState(0);
  const timerRef = useRef(null);

  const debouncedIncrease = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCounter((prev) => prev + 1);
    }, 300);
  }, []);

  return (
    <div className="container">
      <button onClick={debouncedIncrease}>Click Me</button>
      <div>{counter}</div>
    </div>
  );
};

export default Debounce;
