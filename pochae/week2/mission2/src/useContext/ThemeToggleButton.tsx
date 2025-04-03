import { JSX } from "react";
import { useTheme } from "./context/ThemeProvider";

export default function ThemeToggleButton(): JSX.Element {
    const { toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>
    
  </button>
}
