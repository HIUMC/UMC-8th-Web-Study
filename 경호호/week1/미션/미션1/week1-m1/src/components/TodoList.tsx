import React from 'react';
import { Todo } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleTodo, onDeleteTodo }) => {
  return (
    <ul className="todo-list column-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList; 