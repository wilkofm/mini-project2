import React from "react";
import { useTheme } from "../context/MyThemeContext";

function ToggleThemeButton() {
  const { toggleTheme, theme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded"
      style={{
        background: theme.foreground,
        color: theme.text,
        border: `1px solid ${theme.text}`,
      }}
    >
      Toggle Theme
    </button>
  );
}

export default ToggleThemeButton;
