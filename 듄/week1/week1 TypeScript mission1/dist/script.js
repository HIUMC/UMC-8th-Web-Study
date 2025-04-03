document.addEventListener("DOMContentLoaded", function () {
    var taskInput = document.getElementById("taskInput");
    var addButton = document.getElementById("addButton");
    var todoList = document.getElementById("todoList");
    var doneList = document.getElementById("doneList");
    // "Add" 버튼 클릭 시 영화 추가
    addButton.addEventListener("click", function () {
        addTask();
    });
    function addTask() {
        var taskText = taskInput.value.trim();
        if (taskText === "")
            return;
        var li = document.createElement("li");
        li.textContent = taskText;
        // 완료 버튼 생성
        var completeButton = document.createElement("button");
        completeButton.textContent = "watched";
        completeButton.onclick = function () { return moveToDone(li); };
        li.appendChild(completeButton);
        todoList.appendChild(li);
        taskInput.value = "";
    }
    function moveToDone(taskItem) {
        var _a;
        (_a = taskItem.querySelector("button")) === null || _a === void 0 ? void 0 : _a.remove(); // 완료 버튼 제거
        // 삭제 버튼 생성
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.onclick = function () { return taskItem.remove(); };
        taskItem.appendChild(deleteButton);
        doneList.appendChild(taskItem);
    }
});
