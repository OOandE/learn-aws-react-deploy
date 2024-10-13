import React, { useEffect, useState } from "react";

const ToggleButton = ({ onToggle }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onToggle(newState);
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setIsChecked(theme === "dark");
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, []);

  return (
    <div className="toggle-container" onClick={handleToggle}>
      <input
        type="radio"
        id="toggle-on"
        name="toggle"
        checked={isChecked}
        readOnly
      />
      <input
        type="radio"
        id="toggle-off"
        name="toggle"
        checked={!isChecked}
        readOnly
      />
      <label
        htmlFor="toggle-on"
        className={`toggle-label ${isChecked ? "active" : ""}`}
      >
        On
      </label>
      <label
        htmlFor="toggle-off"
        className={`toggle-label ${!isChecked ? "active" : ""}`}
      >
        Off
      </label>
      <div className={`toggle-slider ${isChecked ? "checked" : ""}`}></div>
    </div>
  );
};

export default ToggleButton;
