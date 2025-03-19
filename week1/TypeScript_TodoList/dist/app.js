"use strict";
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const completedList = document.getElementById("completed-list");
let todos = [];
form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value.trim() !== "") {
        addTodo(input.value.trim());
        input.value = "";
    }
});
function addTodo(text) {
    const newTodo = {
        id: Date.now(),
        text,
        completed: false,
    };
    todos.push(newTodo);
    renderTodos();
}
function renderTodos() {
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
            }
            else {
                toggleTodoStatus(todo.id);
            }
        });
        li.appendChild(completeBtn);
        if (todo.completed) {
            completedList.appendChild(li);
        }
        else {
            todoList.appendChild(li);
        }
    });
}
function toggleTodoStatus(id) {
    todos = todos.map((todo) => todo.id === id ? Object.assign(Object.assign({}, todo), { completed: !todo.completed }) : todo);
    renderTodos();
}
function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    renderTodos();
}
renderTodos();
