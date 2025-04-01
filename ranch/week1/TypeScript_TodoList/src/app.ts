interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const form = document.getElementById("todo-form") as HTMLFormElement;
const input = document.getElementById("todo-input") as HTMLInputElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const completedList = document.getElementById(
  "completed-list"
) as HTMLUListElement;

let todos: Todo[] = [];

// 이벤트 리스너: 폼 제출
form.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  if (input.value.trim() !== "") {
    addTodo(input.value.trim());
    input.value = ""; // 입력 필드 초기화
  }
});

// 새로운 할 일 추가
function addTodo(text: string): void {
  const newTodo: Todo = {
    id: Date.now(),
    text,
    completed: false,
  };
  todos.push(newTodo);
  renderTodos();
}

// 할 일 렌더링
function renderTodos(): void {
  todoList.innerHTML = "";
  completedList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;

    const completeBtn = document.createElement("button");
    completeBtn.textContent = todo.completed ? "삭제" : "완료";
    completeBtn.classList.add(todo.completed ? "delete-btn" : "complete-btn");
    completeBtn.addEventListener("click", () => {
      if (todo.completed) {
        deleteTodo(todo.id);
      } else {
        toggleTodoStatus(todo.id);
      }
    });

    li.appendChild(completeBtn);

    if (todo.completed) {
      completedList.appendChild(li);
    } else {
      todoList.appendChild(li);
    }
  });
}

// 할 일 상태 전환
function toggleTodoStatus(id: number): void {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

// 할 일 삭제
function deleteTodo(id: number): void {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

// 초기 렌더링
renderTodos();
