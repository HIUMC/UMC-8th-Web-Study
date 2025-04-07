import { THEME, useTheme } from "./context/ThemeProvider";
import clsx from "clsx";

const ThemeContent =()=>{

    const {theme, toggleTheme}=useTheme();
    
    const isLightMode = theme ===THEME.LIGHT;

    return(
        <div className={clsx('p-4 h-dev w-full', isLightMode? 'bg-white':'bg-gray-800')}>
            ThemeContent
        </div>
    )
}

export default ThemeContent;