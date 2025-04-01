import "./App.css";
import { useState, useRef, useReducer } from "react";
import Header from "./components/Header";
import List from "./components/List";
import Editor from "./components/Editor";

const mockData = [
  {
    id: 0,
    isDone: false,
    content: "공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "밥 먹기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: true, // ✅ Example of a completed task
    content: "Draw",
    date: new Date().getTime(),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  };

  const onUpdate = (targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  };

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  };

  // ✅ Split todos into two lists
  const todosToDo = todos.filter((todo) => !todo.isDone); // 해야 할 일
  const todosDone = todos.filter((todo) => todo.isDone); // 해낸 일

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />

      {/* ✅ Pass separate lists to List component */}
      <List
        todosToDo={todosToDo}
        todosDone={todosDone}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </div>
  );
}

export default App;
