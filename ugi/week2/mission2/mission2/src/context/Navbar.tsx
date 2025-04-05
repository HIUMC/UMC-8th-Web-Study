
import clsx from "clsx";
import {  THEME, useTheme } from "./ThemeProvider";
import ThemeToggleButton from "./ThemeToggleButton";
import { JSX } from "react";

export default function Navbar(): JSX.Element {
    const { theme } = useTheme();

    const isLightMode = theme === THEME.LIGHT;
    
    return (
        <nav className = {clsx(
            'p-4 w-full flex justify-end',
            isLightMode ? 'bg-white' : 'bg-gray-800'
        )}>
            <ThemeToggleButton />
        </nav>
    );
}