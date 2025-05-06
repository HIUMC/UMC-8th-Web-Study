import styled from "styled-components";
import Todolist from "./components/Todolist";
import "./App.css";
import { TodoProvider, TodoneProvider } from "./context/TodoListsContext";
import { ThemeProvider, THEME, useTheme } from "./context/ThemeProvider";
import ThemeToggleButton from "./context/ThemeToggleButton";
import clsx from "clsx";
import { ThemeContext } from "./context/ThemeContext";
import { useState } from "react";

function App() {
  const { theme, toggleTheme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <>
      <ThemeProvider>
        <Wrapper2
          className={clsx(
            "p-4 w-full flex justify-end",
            isLightMode ? "bg-white" : "bh-gray-800",
          )}
        >
          <ThemeToggleButton></ThemeToggleButton>
          <Wrapper>Todolist by React</Wrapper>
          <TodoProvider>
            <TodoneProvider>
              <Todolist></Todolist>
            </TodoneProvider>
          </TodoProvider>
        </Wrapper2>
      </ThemeProvider>
    </>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  margin-top: 150px;
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
`;
