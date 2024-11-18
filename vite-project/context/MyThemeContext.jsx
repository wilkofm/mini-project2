import React, { createContext, useState, useContext, useEffect } from "react";

// light and dark mode themes
export const themes = {
  light: {
    foreground: "#f5f7fa",
    background: "#fefefe",
    text: "#000000",
  },
  dark: {
    foreground: "#202122",
    background: "#1c1d20",
    text: "#ffffff",
  },
};

// creates context object
export const MyThemeContext = createContext();

// makes theme available to all children components
export default function MyThemeProvider({ children }) {
  const [theme, setTheme] = useState(themes.light);

  // toggles the theme between dark and light based on the current state
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === themes.light ? themes.dark : themes.light
    );
  };

  // updates the body backgroundColor and Color to match the current theme
  useEffect(() => {
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.text;
  }, [theme]);

  return (
    <MyThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </MyThemeContext.Provider>
  );
}

export const useTheme = () => useContext(MyThemeContext);
