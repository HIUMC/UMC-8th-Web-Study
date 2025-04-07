import clsx from 'clsx';
import { THEME, useTheme } from "./ThemeProvider";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Navbar() : Element {
  const {theme} = useTheme();

  const isLightMode = theme ===THEME.LIGHT;

  return(
    <nav
      className= {clsx(
        'p-4 w-full flex justify-end',
        isLightMode ? 'bg-white' : 'bg-grey-800'
      )}
    >
      <ThemeToggleButton />
    </nav>
  );
}