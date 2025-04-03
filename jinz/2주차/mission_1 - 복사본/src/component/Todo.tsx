import React, {useState} from "react";

type Task = {
    id: number;
    text: string;
};

const Todo=()=>{
    const[todos, setTodos]=useState<Task[]>([]);
    const[doneTasks, setDoneTasks]=useState<Task[]>([]);
    const[inputText, setInputText]=useState<string>('');

    const handleInputChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setInputText(event.target.value);
    }

    const addTodo=(event:React.FormEvent)=>{
        event.preventDefault();
        if(inputText.trim()==='') return;
    
        const newTask:Task={id: Date.now(), text: inputText };
        setTodos([...todos, newTask]);
        setInputText('');
    }
    
    const completeTask=(task:Task)=>{
        setTodos(todos.filter((t)=> t.id !==task.id));
        setDoneTasks([...doneTasks, task]);
    }
    
    const deleteTask=(task:Task)=>{
        setDoneTasks(doneTasks.filter((t)=>t.id!==task.id));
    }

    
return(
    <div className="todo-container">
      <h1 className="todo-container__header">그래 할 일은 해야지...</h1>
      <form onSubmit={addTodo} className="todo-container__form">
        <input
          type="text"
          id="todo-input"
          className="todo-container__input"
          placeholder="할 일 입력"
          value={inputText}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="todo-container__button">할 일 추가</button>
      </form>
      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul id="todo-list" className="render-container__list">
            {todos.map((task)=>(
                <li key={task.id} className="render-container__item">
                    {task.text}
                    <button 
                     className="render-container__item-button"
                     style={{backgroundColor: '#28a745'}}
                    onClick={()=>completeTask(task)}>완료
                    </button>
                </li>
            ))}
          </ul>
        </div>
        <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul id="done-list" className="render-container__list">
            {doneTasks.map((task)=>(
                <li key={task.id} className="render-container__item">
                    {task.text}
                    <button 
                     className="render-container__item-button"
                     style={{backgroundColor: '#dc3545'}}
                    onClick={()=>deleteTask(task)}>삭제
                    </button>
                </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
)
}


export default Todo;