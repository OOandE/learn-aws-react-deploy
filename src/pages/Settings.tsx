import React, { useEffect, useState } from "react";
import ToggleButton from "../components/ToggleButton.tsx";

export const Settings = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = (value: boolean) => {
    const newTheme = value ? "dark" : "light";
    setTheme(value ? "dark" : "light");
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setTheme(theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, []);
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p className="template__details-item-name" style={{ margin: 0, marginRight: '10px' }}>
        Light
      </p>
      <ToggleButton onToggle={toggleTheme} />
      <p className="template__details-item-name" style={{ margin: 0, marginLeft: '10px' }}>
        Dark
      </p>
    </div>
  );
};
