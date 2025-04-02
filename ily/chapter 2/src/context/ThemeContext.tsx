import { useTheme, THEME } from "./ThemeProvider";
import clsx from "clsx";

export const ThemeContext = () => {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <div
      className={clsx(
        "p-4 h-dvh w-full",
        isLightMode ? "bg-white" : "bg-gray-800",
      )}
    ></div>
  );
};
