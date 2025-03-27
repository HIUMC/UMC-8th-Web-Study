import { JSX } from 'react';
import './App.css'
import { TodoProvider } from './context/TodoContext';
import Todo from './components/Todo';

function App() : JSX.Element {
  return (
    <TodoProvider>
      <Todo />
    </TodoProvider>
  );
}

export default App;
