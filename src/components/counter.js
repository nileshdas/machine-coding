import React, { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [history, setHistory] = useState([]);
  const handleClick = () => {
    setCounter((prev) => prev + 1);
    setHistory((prev) => [...prev, counter]);
  };

  return (
    <>
      <div className="container">
        <div>{counter}</div>
        <button onClick={handleClick}>Add</button>
      </div>
      <div>
        {history.map((elem) => {
          return <div>{elem}</div>;
        })}
      </div>
    </>
  );
};

export default Counter;
