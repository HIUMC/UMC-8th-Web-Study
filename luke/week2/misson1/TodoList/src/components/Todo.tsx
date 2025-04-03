import React, { FormEvent, useState } from 'react';
import { TTodo } from '../types/todo';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import DoneList from './DoneList';
import { TodoContext } from './TodoContext';


const Todo: React.FC = () => {
  const [todos,setTodos] = useState<TTodo[]>([]);
  const [doneTodos,setDoneTodos] = useState<TTodo[]>([]);
  const [input, setInput] = useState<string 

  const handleSubmit = (e: FormEvent<HTMLFormElement>) : void => {
    e.preventDefault();
    const text = input.trim();
    if(text){
      const NewTodo: TTodo = {id : Date.now() , text};
      setTodos((prevTodos) : TTodo[] => [...prevTodos,NewTodo])
      setInput('')
    }
  };

  const completeTodo = (todo:TTodo) : void =>{
    setTodos(prevTodos => prevTodos.filter(t => t.id !== todo.id))
    setDoneTodos((prevdoneTodos) : TTodo[] => ([...prevdoneTodos, todo]))  
  };

  const removeTodo = (todo:TTodo) : void =>{
    setDoneTodos(prevTodos => prevTodos.filter(t => t.id !== todo.id))
  };

  const contextValue = {
    input,
    setInput,
    todos,
    doneTodos,
    handleSubmit,
    completeTodo,
    removeTodo,
  };

  return (
    <TodoContext.Provider value={contextValue}>
    <div className="todo-container">
        <h1 className="todo-container_header">Luke To Do</h1>
        <TodoForm />
        <div className="render-container">
          <TodoList />
          <DoneList />
        </div>
      </div>
    </TodoContext.Provider>
  )
    
  
};

export default Todo;
