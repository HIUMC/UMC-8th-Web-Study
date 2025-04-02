// HTML 문서가 완전히 로드된 후 실행되도록 설정
document.addEventListener("DOMContentLoaded", function () {
  // HTML에서 필요한 요소들을 가져옴
  const taskInput = document.getElementById("taskInput"); // 입력창
  const todoList = document.getElementById("todoList"); // 해야 할 일 목록
  const doneList = document.getElementById("doneList"); // 해낸 일 목록

  // 사용자가 입력창에서 Enter 키를 눌렀을 때 실행
  taskInput.addEventListener("keypress", function (event) {
    // Enter 키를 눌렀고 입력값이 비어있지 않다면
    if (event.key === "Enter" && taskInput.value.trim() !== "") {
      addTask(taskInput.value.trim()); // 입력한 내용을 추가하는 함수 호출
      taskInput.value = ""; // 입력 필드 초기화 (입력값 삭제)
    }
  });

  // 해야 할 일 목록에 새로운 항목을 추가하는 함수
  function addTask(task) {
    const li = document.createElement("li"); // 새로운 리스트 아이템(li) 생성
    li.innerHTML = `
            ${task}  
            <button class="complete">완료</button> 
        `; // 입력한 텍스트와 함께 '완료' 버튼 추가

    // '완료' 버튼 클릭 시 해낸 일 목록으로 이동
    li.querySelector(".complete").addEventListener("click", function () {
      moveToDone(li);
    });

    // 해야 할 일 목록(todoList)에 새로운 항목 추가
    todoList.appendChild(li);
  }

  // 해야 할 일을 해낸 일 목록으로 이동시키는 함수
  function moveToDone(taskElement) {
    // 기존의 '완료' 버튼 삭제 (해낸 일에는 필요 없으므로)
    taskElement.querySelector(".complete").remove();

    // '삭제' 버튼 생성
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제"; // 버튼에 "삭제" 텍스트 추가
    deleteBtn.classList.add("delete"); // CSS 스타일 적용을 위해 클래스 추가

    // '삭제' 버튼 클릭 시 해당 항목을 목록에서 제거
    deleteBtn.addEventListener("click", function () {
      taskElement.remove();
    });

    // '삭제' 버튼을 리스트 항목에 추가
    taskElement.appendChild(deleteBtn);

    // 해낸 일 목록(doneList)에 해당 항목 추가
    doneList.appendChild(taskElement);
  }
});
