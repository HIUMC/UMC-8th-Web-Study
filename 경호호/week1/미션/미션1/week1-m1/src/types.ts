export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export type TodosState = {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}; 