import { isCollection } from "immutable";
import { THEME, useTheme } from "../context/ThemeProvider";
import clsx from "clsx";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  console.log(theme);

  const isLightMode = theme === THEME.LIGHT;
  return (
    <button
      onClick={toggleTheme}
      className={clsx("px-4 py-2 ", {
        "bg-black text-while": !isLightMode,
        "bg-while text-black": isLightMode,
      })}
    >
      {isLightMode ? "🌙 Dark Mode " : "☀️ Light Mode"}
    </button>
  );
};
export default ThemeToggleButton;
