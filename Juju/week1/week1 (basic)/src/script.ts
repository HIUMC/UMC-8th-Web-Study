document.addEventListener("DOMContentLoaded", () => {
    // 요소 가져오기 (타입 지정)
    const input = document.getElementById("todo-input") as HTMLInputElement;
    const addButton = document.getElementById("add-todo") as HTMLButtonElement;
    const todoList = document.getElementById("todo-list") as HTMLUListElement;
    const doneList = document.getElementById("done-list") as HTMLUListElement;

    if (!input || !addButton || !todoList || !doneList) return;

    // 할 일 추가 함수
    const addTodo = (): void => {
        const taskText: string = input.value.trim();
        if (taskText === "") {
            alert("할 일을 입력하세요!");
            return;
        }

        const li: HTMLLIElement = document.createElement("li");

        // 할 일 텍스트 추가
        const span: HTMLSpanElement = document.createElement("span");
        span.textContent = taskText;

        // 완료 버튼 추가
        const completeBtn: HTMLButtonElement = document.createElement("button");
        completeBtn.textContent = "완료";
        completeBtn.classList.add("complete-btn");
        completeBtn.addEventListener("click", () => moveToDone(li));

        li.appendChild(span);
        li.appendChild(completeBtn);
        todoList.appendChild(li);

        input.value = ""; // 입력 필드 초기화
    };

    // 해야 할 일을 해낸 일로 이동
    const moveToDone = (todoItem: HTMLLIElement): void => {
        const doneItem: HTMLLIElement = document.createElement("li");
        doneItem.innerHTML = todoItem.innerHTML;

        // 기존 완료 버튼 삭제 후 삭제 버튼 추가
        const deleteBtn: HTMLButtonElement = document.createElement("button");
        deleteBtn.textContent = "삭제";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => doneItem.remove());

        doneItem.querySelector(".complete-btn")?.remove();
        doneItem.appendChild(deleteBtn);
        
        doneList.appendChild(doneItem);
        todoItem.remove();
    };

    // Enter 입력 시 추가
    input.addEventListener("keypress", (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            addTodo();
        }
    });

    // 추가 버튼 클릭 시 할 일 추가
    addButton.addEventListener("click", addTodo);
});
