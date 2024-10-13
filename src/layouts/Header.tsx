import React, { useEffect, useState } from "react";
import logo from "../assets/images/careconnect.svg";
import ToggleButton from "../components/ToggleButton.tsx";

export default function Header({ pageTitle }) {
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
    <div className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="navbar__main">
        <h3 className="navbar__title">{pageTitle}</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p
            className="template__details-item-name"
            style={{ margin: 0, marginRight: "10px" }}
          >
            Light
          </p>
          <ToggleButton onToggle={toggleTheme} />
          <p
            className="template__details-item-name"
            style={{ margin: 0, marginLeft: "10px" }}
          >
            Dark
          </p>
        </div>
      </div>
    </div>
  );
}
