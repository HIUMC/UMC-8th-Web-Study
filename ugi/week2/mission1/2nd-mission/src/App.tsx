
import { JSX } from 'react';
import './App.css';

import Todo from './components/TodoBefore';
import { TodoProvider } from './context/TodoContext';

function App() : JSX.Element {


  return (
    <TodoProvider>
      <Todo/>
    </TodoProvider>
  );
}

export default App;
