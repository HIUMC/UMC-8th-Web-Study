document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const doneList = document.getElementById("done-list");

    inputField.addEventListener("keypress", function(event) {
        if(event.key === "Enter"){
            let todoText = inputField.value.trim(); // trim()-앞 뒤 공백 제거
            if(todoText !== ""){  // 입력 값 비어있지 않다면
                addTodo(todoText);
                inputField.value = "";  // 입력 창 비워줌
            }
        }
    });
});

function addTodo(todoText){
    let li = document.createElement("li");  // 새로운 <li> 요소 만든다
    li.textContent = todoText;  // <li> 안에 사용자가 입력한 텍스트 넣음

    let completeButton = document.createElement("button");  // 완료 버튼 만들기
    completeButton.textContent = "완료";
    completeButton.classList.add("button-style");

    li.appendChild(completeButton); // li에 버튼 추가
    document.getElementById("todo-list").appendChild(li);   // todo-list에 li 추가해서 화면에 보이게 함

    completeButton.addEventListener("click", function(){    // 완료 버튼 클릭하면 moveToDone() 실행
        moveToDone(li);
    });
}

function moveToDone(li){
    let doneList = document.getElementById("done-list");

    let completeButton = li.querySelector("button");
    if(completeButton){     // 완료 버튼이 있으면 삭제
        li.removeChild(completeButton);
    }

    let deleteButton = document.createElement("button");    // 삭제 버튼 만들기
    deleteButton.textContent = "삭제";
    deleteButton.classList.add("button-style");

    li.appendChild(deleteButton);
    doneList.appendChild(li);   // 해야 할 일에서 해낸 일로 이동

    deleteButton.addEventListener("click", function(){
        li.remove();
    });

}