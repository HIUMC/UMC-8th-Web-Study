"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("todo-input");
    const addButton = document.getElementById("add-todo");
    const todoList = document.getElementById("todo-list");
    const doneList = document.getElementById("done-list");
    if (!input || !addButton || !todoList || !doneList)
        return;
    const addTodo = () => {
        const taskText = input.value.trim();
        if (taskText === "") {
            alert("할 일을 입력하세요!");
            return;
        }
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = taskText;
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "완료";
        completeBtn.classList.add("complete-btn");
        completeBtn.addEventListener("click", () => moveToDone(li));
        li.appendChild(span);
        li.appendChild(completeBtn);
        todoList.appendChild(li);
        input.value = "";
    };
    const moveToDone = (todoItem) => {
        var _a;
        const doneItem = document.createElement("li");
        doneItem.innerHTML = todoItem.innerHTML;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => doneItem.remove());
        (_a = doneItem.querySelector(".complete-btn")) === null || _a === void 0 ? void 0 : _a.remove();
        doneItem.appendChild(deleteBtn);
        doneList.appendChild(doneItem);
        todoItem.remove();
    };
    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTodo();
        }
    });
    addButton.addEventListener("click", addTodo);
});
