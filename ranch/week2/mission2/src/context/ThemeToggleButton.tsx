import { THEME, useTheme } from "./ThemeProvider";
import clsx from "clsx";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;
  return (
    <button
      onClick={toggleTheme}
      className={clsx("px-4 py-2 at rounded-md transition-all", {
        "bg-black text-white": !isLightMode,
        "bg-white text-black": isLightMode,
      })}
    >
      {isLightMode ? "🌙 다크 모드" : "🌞 라이트 모드"}
    </button>
  );
}
