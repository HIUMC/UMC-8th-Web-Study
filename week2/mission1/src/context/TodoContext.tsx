import { createContext, JSX, PropsWithChildren, useContext, useState } from "react";
import { TTodo } from "../types/todo";

interface ITodoContext {
    todos: TTodo[];
    doneTodos: TTodo[];
    addTodo: (text: string) => void;
    completeTodo: (todo: TTodo) => void;
    deleteTodo: (todo: TTodo) => void;
}

export const TodoContext = createContext<ITodoContext | undefined> (undefined);

export const TodoProvider =({children}: PropsWithChildren): JSX.Element => {
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

    const addTodo =(text: string): void => {
        const newTodo: TTodo = {id: Date.now(), text};
        setTodos((prevTodos : TTodo[]) => [...prevTodos, newTodo]); // 새 할 일 추가
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
        <TodoContext.Provider 
        value={{todos, doneTodos, addTodo, completeTodo, deleteTodo}}>
            {children}
        </TodoContext.Provider>
    )
};

export const useTodo = () : ITodoContext => {
    const context = useContext(TodoContext);
    // context가 없는 경우우
    if(!context){
        throw new Error('useTodo를 사용하기 위해서는, 무조건 TodoProvider로 감싸야 합니다.');
    }

    // context가 있는 경우
    return context;
}