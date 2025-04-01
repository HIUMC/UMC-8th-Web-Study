var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var form = document.getElementById("todo-form");
var input = document.getElementById("todo-input");
var todoList = document.getElementById("todo-list");
var completedList = document.getElementById("completed-list");
var todos = [];
// 이벤트 리스너: 폼 제출
form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (input.value.trim() !== "") {
        addTodo(input.value.trim());
        input.value = ""; // 입력 필드 초기화
    }
});
// 새로운 할 일 추가
function addTodo(text) {
    var newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
    };
    todos.push(newTodo);
    renderTodos();
}
// 할 일 렌더링
function renderTodos() {
    todoList.innerHTML = "";
    completedList.innerHTML = "";
    todos.forEach(function (todo) {
        var li = document.createElement("li");
        li.textContent = todo.text;
        var completeBtn = document.createElement("button");
        completeBtn.textContent = todo.completed ? "삭제" : "완료";
        completeBtn.classList.add(todo.completed ? "delete-btn" : "complete-btn");
        completeBtn.addEventListener("click", function () {
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
// 할 일 상태 전환
function toggleTodoStatus(id) {
    todos = todos.map(function (todo) {
        return todo.id === id ? __assign(__assign({}, todo), { completed: !todo.completed }) : todo;
    });
    renderTodos();
}
// 할 일 삭제
function deleteTodo(id) {
    todos = todos.filter(function (todo) { return todo.id !== id; });
    renderTodos();
}
// 초기 렌더링
renderTodos();
