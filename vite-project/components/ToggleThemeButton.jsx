import React from "react";
import { useTheme } from "../context/MyThemeContext";
import { Icon } from "@iconify/react";

function ToggleThemeButton() {
  const { toggleTheme, theme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-full hover:shadow-custom-blue cursor-pointer"
      style={{
        background: theme.foreground,
        color: theme.text,
        outline: "none !important",
      }}
    >
      <Icon
        icon={theme === theme.dark ? "ph:sun" : "ph:moon"}
        style={{
          fontSize: "24px",
          color: theme.text,
        }}
      />
    </button>
  );
}

export default ToggleThemeButton;
