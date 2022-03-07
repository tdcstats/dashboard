import React, { useState, useEffect, useContext } from "react";
import propTypes from "prop-types";

export const ThemeContext = React.createContext();

export const useTheme = () => useContext(ThemeContext);

const themes = [
  "light",
  "dark",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
];

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("luxury");

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");

    if (localTheme)
      return document
        .querySelector("html")
        .setAttribute("data-theme", localTheme);

    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleTheme = (value) => {
    localStorage.setItem("theme", value);
    setTheme(value);
  };

  return (
    <ThemeContext.Provider value={{ theme, themes, handleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = { children: propTypes.object };
