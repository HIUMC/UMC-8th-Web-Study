
import { THEME, useTheme } from "./context/ThemeProvider";
import ThemeToggleButton from "./context/ThemeToggleButton";
import clsx from "clsx";

const Navbar =()=>{
    const {theme, toggleTheme}=useTheme();
    
    const isLightMode = theme ===THEME.LIGHT;
    return(
        <nav className={clsx('p-4 w-full flex justity-end',
            isLightMode?'bg-whilte':'bg-gray-800')}>
            <ThemeToggleButton />
        </nav>
    )
}

export default Navbar;