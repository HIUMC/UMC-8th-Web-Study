"use strict";
const todoInput = document.getElementById("todo-input");
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-before-list");
const doneList = document.getElementById("todo-after-list");
let todos = [];
let doneTasks = [];
const renderTasks = () => {
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
const getTodoText = () => todoInput.value.trim();
const addTodo = (text) => {
    todos.push({ id: Date.now(), text });
    todoInput.value = "";
    renderTasks();
};
const completeTodo = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTasks.push(Object.assign({}, todo));
    renderTasks();
};
const deleteTodo = (todo) => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTasks();
};
const createTodoElement = (todo, isDone) => {
    const li = document.createElement("li");
    li.classList.add("Render_item");
    const textElement = document.createElement("p");
    textElement.classList.add("Render_item_text");
    textElement.textContent = todo.text;
    const button = document.createElement("button");
    button.classList.add("Render_item_btn");
    button.textContent = isDone ? "삭제" : "완료";
    button.style.backgroundColor = isDone ? "#de3545" : "#28a745";
    button.addEventListener("click", () => {
        isDone ? deleteTodo(todo) : completeTodo(todo);
    });
    li.appendChild(textElement);
    li.appendChild(button);
    return li;
};
todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = getTodoText();
    if (text)
        addTodo(text);
});
renderTasks();
