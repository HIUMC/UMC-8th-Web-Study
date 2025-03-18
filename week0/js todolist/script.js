document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const doneList = document.getElementById("done-list");

    const defaultPlaceholder = "스터디 계획을 작성해보세요!";

    input.addEventListener("focus", function () {
        input.placeholder = "";
    });

    input.addEventListener("blur", function () {
        if (input.value.trim() === "") {
            input.placeholder = defaultPlaceholder;
        }
    });

    // 할 일 추가
    function addTodo() {
        const taskText = input.value.trim();
        if (taskText === "") {
            alert("할 일을 입력하세요!");
            return;
        }

        const li = document.createElement("li");

        // 할 일 텍스트 추가
        const span = document.createElement("span");
        span.textContent = taskText;

        // 완료 버튼 추가
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "완료";
        completeBtn.classList.add("complete-btn");
        completeBtn.addEventListener("click", function () {
            moveToDone(li);
        });

        li.appendChild(span);
        li.appendChild(completeBtn);

        todoList.appendChild(li);
        input.value = ""; // 입력 필드 초기화
        input.placeholder = defaultPlaceholder; // 초기화 후 placeholder 복구
    }

    // 해야 할 일을 해낸 일로 이동
    function moveToDone(todoItem) {
        const doneItem = document.createElement("li");
        doneItem.innerHTML = todoItem.innerHTML;

        // 기존 완료 버튼 삭제 후 삭제 버튼 추가
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function () {
            doneItem.remove();
        });

        doneItem.querySelector(".complete-btn").remove();
        doneItem.appendChild(deleteBtn);

        doneList.appendChild(doneItem);
        todoItem.remove();
    }

    // Enter 입력 시 추가
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTodo();
        }
    });
});
