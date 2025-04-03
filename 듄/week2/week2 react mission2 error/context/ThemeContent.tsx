import clsx from 'clsx';
import { THEME, useTheme } from "./ThemeProvider";

export default function ThemeContent() : Element {
  const {theme} = useTheme();

  const isLightMode = theme ===THEME.LIGHT;

  return(
    <div
      className= {clsx(
        'p-4 w-full',
        isLightMode ? 'bg-white' : 'bg-grey-800'
      )}
    >
      ThemeContent
    </div>
  );
}