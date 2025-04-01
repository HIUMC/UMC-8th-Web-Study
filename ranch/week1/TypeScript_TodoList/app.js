var form = document.getElementById("todo-form");
var input = document.getElementById("todo-input");
var todoList = document.getElementById("todo-list");
var completedList = document.getElementById("completed-list");
var todos = [];
form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (input.value.trim() !== "") {
        addTodo(input.value.trim());
        input.value = "";
    }
});
function addTodo(text) {
    var newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
    };
    todos.push(newTodo);
    renderTodos();
}
function renderTodos() {
    todoList.innerHTML = "";
    completedList.innerHTML = "";
    todos.forEach(function (todo) {
        var li = document.createElement("li");
        li.textContent = todo.text;
        if (todo.completed) {
            var deleteBtn = createButton("삭제", "delete-btn", function () {
                return deleteTodo(todo.id);
            });
            li.appendChild(deleteBtn);
            completedList.appendChild(li);
        }
        else {
            var completeBtn = createButton("완료", "complete-btn", function () {
                return completeTodo(todo.id);
            });
            li.appendChild(completeBtn);
            todoList.appendChild(li);
        }
    });
}
function createButton(text, className, onClick) {
    var button = document.createElement("button");
    button.textContent = text;
    button.className = className;
    button.addEventListener("click", onClick);
    return button;
}
function completeTodo(id) {
    var todo = todos.find(function (todo) { return todo.id === id; });
    if (todo) {
        todo.completed = true;
        renderTodos();
    }
}
function deleteTodo(id) {
    todos = todos.filter(function (todo) { return todo.id !== id; });
    renderTodos();
}
