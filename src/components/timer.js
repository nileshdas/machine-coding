import React, { useRef, useState } from "react";

const Timer = ({}) => {
  const timeInSeconds = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleStart = () => {
    timeInSeconds.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };
  const handleReset = () => {
    clearInterval(timeInSeconds.current);
    setTimer(0);
    setIsActive(false);
  };

  const handlePause = () => {
    clearInterval(timeInSeconds.current);
    setIsActive(false);
  };

  return (
    <>
      <div>{timer}</div>

      <div className="tab-container">
        <button className="tab" onClick={handleStart}>
          Start
        </button>
        <button className="tab" onClick={handlePause}>
          Pause
        </button>
        <button className="tab" onClick={handleReset}>
          Reset
        </button>
      </div>
    </>
  );
};

export default Timer;
