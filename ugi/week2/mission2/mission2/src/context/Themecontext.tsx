import clsx from "clsx";
import { THEME, useTheme } from "./ThemeProvider";
import { JSX } from "react";

export default function ThemeContent(): JSX.Element {
    const { theme,  } = useTheme();

    const isLightMode = theme === THEME.LIGHT;

    return (
        <div
        className = {clsx('p-4 h-dvh' , isLightMode ? 'bg-white' : 'bg-gray-800')}
    >
        <h1 
        className={clsx(
            'text-wxl font-bold',
            isLightMode ? 'text-black' : 'text-white'
        )}
        >
            Theme Content
        </h1>
        <p className={clsx('mt-2', isLightMode ? 'text-black' : 'text-white')}></p>
    </div>
    );
}