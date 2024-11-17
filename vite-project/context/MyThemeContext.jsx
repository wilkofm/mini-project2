import React, { createContext, useState, useContext } from "react";

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

export const MyThemeContext = createContext();

export default function MyThemeProvider({ children }) {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === themes.light ? themes.dark : themes.light
    );
  };

  return (
    <MyThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </MyThemeContext.Provider>
  );
}

export const useTheme = () => useContext(MyThemeContext);
