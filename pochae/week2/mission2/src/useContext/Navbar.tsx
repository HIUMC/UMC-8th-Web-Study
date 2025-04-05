import { JSX } from "react";
import { THEME, useTheme } from "./context/ThemeProvider";
import ThemeToggleButton from "./ThemeToggleButton";
import clsx from "clsx";

export default function Navbar(): JSX.Element {
  const { theme } = useTheme();
  
  const isLightMode = theme === THEME.LIGHT;

  console.log(theme);
  return (
  <nav className={clsx(
    'p-4 w-full flex justify-end',
    isLightMode ? 'bg-white' : 'bg-gray-800'
  )}>
    <ThemeToggleButton />
  </nav>
  );
}

