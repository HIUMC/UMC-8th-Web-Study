import { THEME, useTheme } from "./ThemeProvider"
import clsx from "clsx";

const ThemeToggleButton =()=>{
    const {theme, toggleTheme}=useTheme();

    const isLightMode = theme ===THEME.LIGHT;
    return(
        
        <button onClick={toggleTheme}
            className={clsx('px-4 py-2 mt-4 rounded-md transition-all', {
                'bg-gray-800 text-white': !isLightMode,
                'bg-white text-black': isLightMode,
            })}>
            {isLightMode ? ' 다크모드':'라이트모드'}

        </button>
    )
}


export default ThemeToggleButton