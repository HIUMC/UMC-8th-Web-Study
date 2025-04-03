import React, { useState } from 'react';
import './App.css';
import { Todo, TodosState } from './types';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const App: React.FC = () => {
  const [todoState, setTodoState] = useState<TodosState>({
    todos: [],
    filter: 'all'
  });

  const addTodo = (text: string): void => {
    if (text.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text,
        completed: false
      };
      
      setTodoState(prevState => ({
        ...prevState,
        todos: [...prevState.todos, newTodo]
      }));
    }
  };

  const toggleTodo = (id: number): void => {
    setTodoState(prevState => ({
      ...prevState,
      todos: prevState.todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  };

  const deleteTodo = (id: number): void => {
    setTodoState(prevState => ({
      ...prevState,
      todos: prevState.todos.filter(todo => todo.id !== id)
    }));
  };

  // 필터링된 투두 목록 생성
  const activeTodos = todoState.todos.filter(todo => !todo.completed);
  const completedTodos = todoState.todos.filter(todo => todo.completed);

  return (
    <div className="App">
      <header className="App-header">
        <div className="main-container">
          <h1>경호호의 TODO</h1>
          <TodoForm onAddTodo={addTodo} />
          
          <div className="todo-container">
            <div className="todo-column">
              <h2>할 일 리스트</h2>
              <TodoList 
                todos={activeTodos}
                onToggleTodo={toggleTodo}
                onDeleteTodo={deleteTodo}
              />
            </div>
            
            <div className="todo-column">
              <h2>완료 리스트</h2>
              <TodoList 
                todos={completedTodos}
                onToggleTodo={toggleTodo}
                onDeleteTodo={deleteTodo}
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default App; 