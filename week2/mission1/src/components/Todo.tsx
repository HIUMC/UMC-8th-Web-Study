import React, { useState } from 'react';
import { Task } from '../types';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import CompletedList from './CompletedList';

const Todo: React.FC = () => {
  // 할 일 및 완료된 작업을 저장할 상태
  const [todos, setTodos] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  // 할 일 추가 함수
  const addTodo = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text: text.trim(),
    };
    setTodos([...todos, newTask]);
  };

  // 할 일 완료 처리
  const completeTask = (task: Task) => {
    setTodos(todos.filter((t) => t.id !== task.id));
    setDoneTasks([...doneTasks, task]);
  };

  // 완료된 할 일 삭제
  const deleteTask = (task: Task) => {
    setDoneTasks(doneTasks.filter((t) => t.id !== task.id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">YONG TODO</h1>
      <TodoForm onAddTodo={addTodo} />
      <div className="render-container">
        <TodoList tasks={todos} onComplete={completeTask} />
        <CompletedList tasks={doneTasks} onDelete={deleteTask} />
      </div>
    </div>
  );
};

export default Todo; 