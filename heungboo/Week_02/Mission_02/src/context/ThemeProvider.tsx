import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useState,
} from "react";

export enum THEME {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

type TTheme = THEME.LIGHT | THEME.DARK;

interface IThemeContext {
  theme: TTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({
  children,
}: PropsWithChildren): ReactElement => {
  const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

  const toggleTheme = () => {
    setTheme(
      (prevTheme): THEME =>
        prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    );
  };

  return (
    <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useTheme를 사용하기 위해서는 무조건 TOdoProvide로 감싸야합니다."
    );
  }
  return context;
};
