import { useTheme, THEME } from "./context/ThemeProvider";
import clsx from "clsx";
import ThemeToggleButton from "./context/ThemeToggleButton";

export default function NavBar() {
  const { theme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <nav
      className={clsx(
        "p-4 w-full flex justify-end",
        isLightMode ? "bg-white" : "bg-gray-800"
      )}
    >
      <ThemeToggleButton />
    </nav>
  );
}
