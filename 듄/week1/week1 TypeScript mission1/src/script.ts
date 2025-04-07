document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput") as HTMLInputElement;
  const addButton = document.getElementById("addButton") as HTMLButtonElement;
  const todoList = document.getElementById("todoList") as HTMLUListElement;
  const doneList = document.getElementById("doneList") as HTMLUListElement;

  // "Add" 버튼 클릭 시 영화 추가
  addButton.addEventListener("click", () => {
    addTask();
  });

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");
    li.textContent = taskText;

    // 완료 버튼 생성
    const completeButton = document.createElement("button");
    completeButton.textContent = "watched";
    completeButton.onclick = () => moveToDone(li);

    li.appendChild(completeButton);
    todoList.appendChild(li);

    taskInput.value = "";
  }

  function moveToDone(taskItem: HTMLLIElement) {
    taskItem.querySelector("button")?.remove(); // 완료 버튼 제거

    // 삭제 버튼 생성
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.onclick = () => taskItem.remove();

    taskItem.appendChild(deleteButton);
    doneList.appendChild(taskItem);
  }
});
