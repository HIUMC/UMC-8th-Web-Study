"use strict";
// 1. html 요소를 Dom요소를 이용해서 가져오기
const todoInput = document.getElementById('todo-input');
const todoform = document.getElementById('todo-form');
const todolist = document.getElementById('todo-list');
const donelist = document.getElementById('done-list');
let todos = JSON.parse(localStorage.getItem("todos") || "[]");
let donetasks = JSON.parse(localStorage.getItem("donetasks") || "[]");
// -  할 일 목록 렌더링 하는 함수
const renderTask = () => {
    todolist.innerHTML = '';
    donelist.innerHTML = '';
    todos.forEach((todo) => {
        const li = createTodoElement(todo, false);
        todolist.appendChild(li);
    });
    donetasks.forEach((todo) => {
        const li = createTodoElement(todo, true);
        donelist.appendChild(li);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("donetasks", JSON.stringify(donetasks));
};
// 3. 할 일 텍스트 입력 처리 함수(공백 처리)
const getTodoText = () => {
    return todoInput.value.trim();
};
// 4. 할 일 추가 처리 함수
const addTodo = (text) => {
    todos.push({ id: Date.now(), text });
    todoInput.value = '';
    renderTask();
};
// 5. 할 일 -> 완료
const completetodo = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
    donetasks.push(todo);
    renderTask();
};
// 6. 완료 -> 삭제
const removetodo = (done) => {
    donetasks = donetasks.filter((t) => t.id !== done.id);
    renderTask();
};
// 7. 할 일 아이템 생성 함수 (완료 여부에 따라 텍스트나 버튼 수정)
const createTodoElement = (todo, isdone) => {
    const li = document.createElement('li');
    li.classList.add('render-container_item');
    li.textContent = todo.text;
    const button = document.createElement('button');
    button.classList.add('render-container_item_button');
    if (isdone) {
        button.textContent = '삭제';
        button.style.backgroundColor = '#dc2424';
    }
    else {
        button.textContent = '완료';
        button.style.backgroundColor = '#24a745';
    }
    button.addEventListener('click', () => {
        if (isdone) {
            removetodo(todo);
        }
        else {
            completetodo(todo);
        }
    });
    li.appendChild(button);
    return li;
};
/*
<ul id = "todo-list" class = "render-container_list">
          <li class = "render-container_item">
            <p class = "render-container_item_text">123</p>
            <button class = "render-container_item_button">삭제</button>
          </li>
        </ul>
*/
// 8. 폼 제출 이벤트 리스너
todoform.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
    console.log("!");
});
renderTask();
