/* 입력을 받으면 -> 할 일에 추가해 버튼이랑 같이 만들어 -> 버튼 누르면 한 일에 추가 해 -> 한 일에서 삭제 누르면 삭제 해*/
const task=document.querySelector(".todo_input") as HTMLInputElement;
const todoList=document.querySelector("#todo_list") as HTMLUListElement;
const doneList=document.querySelector("#done_list") as HTMLUListElement;

const addTodoList = (): void =>{
    if(task.value.trim()!==""){ //입력이 공백이 아닐 경우

        //입력값 새 노드에 입력력
        const newTask=document.createElement("li") as HTMLLIElement;
        newTask.textContent=task.value;

        
        //완료 버튼 생성
        const completeButton=document.createElement("button") as HTMLButtonElement;
        completeButton.textContent="완료";
        completeButton.classList.add("completeButton");
        newTask.appendChild(completeButton);

        //완료버튼 클릭 시 donelist로 이동...
        completeButton.addEventListener("click", () => {
            moveTodone(newTask);
        })

        
        todoList.appendChild(newTask);
        newTask.classList.add("tasks");

        task.value=""; //입력 후 공백처리리
    }
}

const moveTodone = (task:HTMLElement): void => {
    task.querySelector("button")?.remove();

    const deleteButton=document.createElement("button") as HTMLButtonElement;
    deleteButton.textContent="삭제";
    deleteButton.classList.add("deleteButton");
    

    deleteButton.addEventListener("click", ()=>{
        deleteTask(task);
    })
    task.appendChild(deleteButton);
    doneList.appendChild(task);
}

const deleteTask=(task:HTMLElement): void =>{
    task.querySelector("button")?.remove;
    doneList.removeChild(task);
}

task.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTodoList();
    }
});