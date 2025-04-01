import { useContext, createContext, PropsWithChildren, useState } from "react";

//상태를 만들어주는 것임.ㅇ
export enum THEME {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

type TTHEME = THEME.LIGHT | THEME.DARK;
interface IThemeContext {
  theme: TTHEME;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<TTHEME>(THEME.LIGHT);
  const toggleTheme = (): void => {
    setTheme(
      (prevTheme): THEME =>
        prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT,
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used with in a ThemeProvider");
  }

  return context;
};
