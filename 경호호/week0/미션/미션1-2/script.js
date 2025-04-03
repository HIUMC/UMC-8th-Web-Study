// DOM 요소 가져오기
const taskInput = document.getElementById('taskInput');
const pendingTasksList = document.getElementById('pendingTasks');
const completedTasksList = document.getElementById('completedTasks');

// 로컬 스토리지에서 작업 가져오기
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// 작업 저장 함수
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 작업 렌더링 함수
function renderTasks() {
    // 목록 초기화
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';
    
    // 각 작업 렌더링
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        // 작업 텍스트 생성
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.classList.add('task-text');
        
        li.appendChild(taskText);
        
        if (task.completed) {
            // 완료된 작업은 삭제 버튼만 표시
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '삭제';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                tasks.splice(index, 1);
                renderTasks();
                saveTasks();
            });
            
            li.appendChild(deleteBtn);
            completedTasksList.appendChild(li);
        } else {
            // 미완료 작업은 완료 버튼 표시
            const completeBtn = document.createElement('button');
            completeBtn.textContent = '완료';
            completeBtn.classList.add('complete-btn');
            completeBtn.addEventListener('click', () => {
                tasks[index].completed = true;
                renderTasks();
                saveTasks();
            });
            
            li.appendChild(completeBtn);
            pendingTasksList.appendChild(li);
        }
    });
}

// 작업 추가 함수
function addTask() {
    const text = taskInput.value.trim();
    
    if (text) {
        tasks.push({
            text,
            completed: false
        });
        
        taskInput.value = '';
        renderTasks();
        saveTasks();
    }
}

// 이벤트 리스너 등록
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// 초기 렌더링
renderTasks(); 