"use strict";
const task = document.querySelector(".todo_input");
const todoList = document.querySelector("#todo_list");
const doneList = document.querySelector("#done_list");
const addTodoList = () => {
    if (task.value.trim() !== "") {
        const newTask = document.createElement("li");
        newTask.textContent = task.value;
        const completeButton = document.createElement("button");
        completeButton.textContent = "완료";
        completeButton.classList.add("completeButton");
        newTask.appendChild(completeButton);
        completeButton.addEventListener("click", () => {
            moveTodone(newTask);
        });
        todoList.appendChild(newTask);
        newTask.classList.add("tasks");
        task.value = "";
    }
};
const moveTodone = (task) => {
    var _a;
    (_a = task.querySelector("button")) === null || _a === void 0 ? void 0 : _a.remove();
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", () => {
        deleteTask(task);
    });
    task.appendChild(deleteButton);
    doneList.appendChild(task);
};
const deleteTask = (task) => {
    var _a;
    (_a = task.querySelector("button")) === null || _a === void 0 ? void 0 : _a.remove;
    doneList.removeChild(task);
};
task.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTodoList();
    }
});
