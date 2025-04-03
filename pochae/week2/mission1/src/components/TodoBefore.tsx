import { FormEvent, JSX } from "react";
import { useState } from "react";
import { TTodo } from "../types/todo";

const TodoBefore = (): JSX.Element => {
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
    const [input, setInput] =useState<string>('');

    // const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    //     setInput(e.target.value);
    // };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) : void => {
        e.preventDefault(); // 새로고침 방지
        const text = input.trim();  // 공백 제거

        if(text) {
            const newTodo: TTodo = {id: Date.now(), text};
            setTodos((prevTodos : TTodo[]) => [...prevTodos, newTodo]); // 새 할 일 추가
            setInput('');   // 입력창 초기화
        }
    };

    const completeTodo = (todo: TTodo) : void => {
        setTodos(prevTodos => prevTodos.filter((t): boolean => t.id !== todo.id));  // 원래 목록에서 제거
        // filter 함수는 조건에 맞는 요소만 추출하여 새로운 배열을 만듭니다. todo.id랑 다른 애들만 남기라는 뜻
        setDoneTodos((prevDoneTodos: TTodo[]) => [...prevDoneTodos, todo]); // 완료 목록에 추가
    };

    const deleteTodo = (todo: TTodo) : void => {
        setDoneTodos((prevDoneTodo): TTodo[] => prevDoneTodo.filter((t): boolean => t.id !== todo.id));
    };

  return (
    <div className='todo-container'>
        <h1 className='todo-container__header'>YONG TODO</h1>

        <form onSubmit={handleSubmit} className='todo-container__form'>
            <input 
                value = {input}
                onChange={(e): void => setInput(e.target.value)}
                type='text'
                className='todo-container__input' 
                placeholder='할 일 입력'
                required
            />
            <button type='submit' className='todo-container__button'>
                할 일 추가
            </button>
        </form>

        <div className='render-container'>
            <div className='render-container__section'>
                <h2 className='render-container__title'>할 일</h2>
                <ul id='todo-list' className='render-container__list'>
                    {todos.map((todo): JSX.Element => (
                        <li key={todo.id} className='render-container__item'>
                            <span className='render-container__item-text'>{todo.text}</span>
                            <button 
                            onClick={(): void => completeTodo(todo)}
                            style={{
                                backgroundColor: '#28a745',
                            }}className='render-container__item-button'>완료</button>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className='render-container__section'>
                <h2 className='render-container__title'>완료</h2>
                <ul id='todo-list' className='render-container__list'>
                    {doneTodos.map((todo): JSX.Element => (
                        <li key={todo.id} className='render-container__item'>
                            <span className='render-container__item-text'>{todo.text}</span>
                            <button 
                            onClick={(): void => deleteTodo(todo)}
                            style={{
                                backgroundColor: '#dc3545',
                            }}className='render-container__item-button'>삭제</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  );
};

export default TodoBefore;

