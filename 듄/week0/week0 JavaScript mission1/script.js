document.addEventListener("DOMContentLoaded", () => { //HTML이 로드된 후 JavaScript가 실행되도록 이벤트 리스너 추가
  const taskInput = document.getElementById("taskInput"); // 입력 필드
  const todoList = document.getElementById("todoList"); // 해야 할 일 리스트
  const doneList = document.getElementById("doneList"); // 해낸 일 리스트
  
  // 입력 필드에서 ENTER 키를 누르면 할 일 추가
  taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // 할 일 추가 함수
  function addTask() {
    const taskText = taskInput.value.trim(); // 입력 값 가져오기 (앞뒤 공백 제거)
    if (taskText === "") return; // 빈 값이면 추가하지 않음

    const li = document.createElement("li"); // 새로운 리스트 아이템 생성
    li.textContent = taskText; // 입력한 내용을 리스트 아이템에 추가

    // 완료 버튼 생성
    const completeButton = document.createElement("button");
    completeButton.textContent = "watched"; // 버튼 "완료" 문구 추가
    completeButton.onclick = () => moveToDone(li); // 클릭하면 해낸 일일로 이동

    li.appendChild(completeButton); // 리스트 아이템에 완료 버튼 추가
    todoList.appendChild(li); // 해야 할 일 리스트에 추가

    taskInput.value = ""; // 입력 필드 초기화
  }

  // 완료된 일로 이동하는 함수
  function moveToDone(taskItem) {
    const doneList = document.getElementById("doneList"); // 해낸 일 리스트
    taskItem.querySelector("button").remove(); // 완료 버튼 제거
    // 삭제 버튼 생성
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.onclick = () => taskItem.remove();

    taskItem.appendChild(deleteButton);
    doneList.appendChild(taskItem); // 해야 할 일에서 해낸 일로 이동
  }

  // 완료된 일 리스트 삭제

  
});
