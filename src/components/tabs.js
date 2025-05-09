import React, { useState } from "react";

const TabComponent = ({ tabsData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { content = "" } = tabsData[activeIndex];
  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      <h1>Tab Component</h1>
      <div className="tab-container">
        {tabsData.map((tab, index) => {
          return (
            <div
              className={index === activeIndex ? "active tab" : "disabled tab"}
              onClick={() => handleClick(index)}
            >
              {tab.label}
            </div>
          );
        })}
      </div>
      <div>{content}</div>
    </>
  );
};

export default TabComponent;
