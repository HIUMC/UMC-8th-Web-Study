import clsx from "clsx";
import React from "react";
import { useTheme, THEME } from "./ThemeProvider";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <button
      onClick={toggleTheme}
      className={clsx("px-4 py-2 mt-4 rounded-md transition-all", {
        "bg-black text-white": !isLightMode,
        "bg-white text-black": isLightMode,
      })}
    >
      {isLightMode ? "다크모드" : "라이트모드"}
    </button>
  );
}
