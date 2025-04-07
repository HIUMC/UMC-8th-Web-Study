const input = document.querySelector(".Plan_Wrapper_Input");
const todoList = document.querySelector(".Plan_Wrapper_Before");
const doneList = document.querySelector(".Plan_Wrapper_After");

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && input.value.trim() !== "") {
    addTodo(input.value);
    input.value = ""; // 입력칸 초기화
  }
});

function addTodo(text) {
  const todoItem = document.createElement("div"); // 할 일 담을 div
  todoItem.classList.add("todo-item"); // 스타일 추가

  const todoText = document.createElement("span"); // 할 일 텍스트
  todoText.textContent = text;

  const doneBtn = document.createElement("button"); // 완료 버튼
  doneBtn.textContent = "완료";
  doneBtn.classList.add("done-btn");

  doneBtn.addEventListener("click", () => {
    todoItem.remove();
    movetoDone(text);
  });

  todoItem.appendChild(todoText);
  todoItem.appendChild(doneBtn);
  todoList.appendChild(todoItem);
}

function movetoDone(text) {
  const doneItem = document.createElement("div");
  doneItem.classList.add("todo-item");

  const doneText = document.createElement("span");
  doneText.textContent = text;

  const clearBtn = document.createElement("button");
  clearBtn.textContent = "삭제";
  clearBtn.classList.add("done-btn");

  clearBtn.addEventListener("click", () => {
    doneItem.remove();
  });

  doneItem.appendChild(doneText);
  doneItem.appendChild(clearBtn);
  doneList.appendChild(doneItem);
}
