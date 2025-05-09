import React, { useState } from "react";

const searchOptions = [
  "Alice Johnson",
  "Marcus Reed",
  "Samantha Lee",
  "Daniel Kim",
  "Olivia Parker",
  "Ethan Ramirez",
  "Sophia Bennett",
  "Liam Turner",
  "Ava Mitchell",
  "Noah Hayes",
];

const Dropdown = () => {
  const [inFocus, setInFocus] = useState(false);
  const [currentSearch, setCurrentSearch] = useState("");

  const handleFocus = () => {
    console.log("Seach Focused");
    setInFocus(true);
  };

  const handleChange = (e) => {
    setCurrentSearch(e.target.value);
  };

  const handleBlur = () => {
    setInFocus(false);
  };

  const getFilteredOptions = () => {
    return searchOptions.filter((option) => {
      return option.startsWith(currentSearch);
    });
  };

  const filteredOptions = getFilteredOptions();

  return (
    <div className="container">
      <input
        placeholder="Search Here"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <label text="Dropdown" />
      {inFocus && (
        <div className="search-options-container">
          {filteredOptions.map((option) => {
            return <div className="search-option">{option}</div>;
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
