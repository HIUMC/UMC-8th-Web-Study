const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById(
  "todo-before-list"
) as HTMLUListElement;
const doneList = document.getElementById("todo-after-list") as HTMLUListElement;

type Todo = {
  id: number;
  text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

const renderTasks = (): void => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  todos.forEach((todo) => {
    const li = createTodoElement(todo, false);
    todoList.appendChild(li);
  });

  doneTasks.forEach((todo) => {
    const li = createTodoElement(todo, true);
    doneList.appendChild(li);
  });
};

const getTodoText = (): string => todoInput.value.trim();

const addTodo = (text: string): void => {
  todos.push({ id: Date.now(), text });
  todoInput.value = "";
  renderTasks();
};

const completeTodo = (todo: Todo): void => {
  todos = todos.filter((t) => t.id !== todo.id);
  doneTasks.push({ ...todo }); // 새로운 객체 추가
  renderTasks();
};

const deleteTodo = (todo: Todo): void => {
  doneTasks = doneTasks.filter((t) => t.id !== todo.id);
  renderTasks();
};

const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
  const li = document.createElement("li");
  li.classList.add("Render_item");

  // 텍스트 요소 추가
  const textElement = document.createElement("p");
  textElement.classList.add("Render_item_text");
  textElement.textContent = todo.text;

  // 버튼 생성
  const button = document.createElement("button");
  button.classList.add("Render_item_btn");
  button.textContent = isDone ? "삭제" : "완료";
  button.style.backgroundColor = isDone ? "#de3545" : "#28a745";

  // 버튼 클릭 이벤트
  button.addEventListener("click", () => {
    isDone ? deleteTodo(todo) : completeTodo(todo);
  });

  li.appendChild(textElement);
  li.appendChild(button);
  return li;
};

todoForm.addEventListener("submit", (event: Event): void => {
  event.preventDefault();
  const text = getTodoText();
  if (text) addTodo(text);
});

renderTasks();
