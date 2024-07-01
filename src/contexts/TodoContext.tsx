// import React, { createContext, useContext, useState } from 'react';

// type TodoContextType = {
//     todoList: Todo[];
//     addTodo: (todo: Todo) => void;
//     editTodo: (todo: Todo) => void;
//     proceedStatus: (id: number) => void;
//     logicalDeleteTodo: (target: Todo) => void;
// };

// export type Todo = {
//     id: number;
//     status: number;
//     title: string;
//     description: string;
//     startDate: string;
//     endDate: string;
//     logicalDeleted: boolean;
// }

// const TodoContext = createContext<TodoContextType | undefined>(undefined);

// export const useTodoContext = () => {
//     const context = useContext(TodoContext);
//     if (!context) {
//         throw new Error('useTodoContext must be used within a TodoProvider');
//     }
//     return context;
// };

// export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [todoList, setTodoList] = useState<Todo[]>([]);

//     const addTodo = (todo: Todo): void => {
//         const newTodo: Todo = { ...todo, id: new Date().getTime() };
//         setTodoList((prevTodoList: Todo[]) => [...prevTodoList, newTodo]);
//     };

//     const editTodo = (todo: Todo): void => {
//         setTodoList((prevTodoList: Todo[]) =>
//             prevTodoList.map(t => (t.id === todo.id ? todo : t))
//         );
//     };

//     const proceedStatus = (id: number): void => {
//         setTodoList((prevTodoList: Todo[]) =>
//             prevTodoList.map(todo =>
//                 todo.id === id ? { ...todo, status: Math.min(todo.status + 1, 2) } : todo
//             )
//         );
//     };

//     const logicalDeleteTodo = (target: Todo): void => {
//         setTodoList((prevTodoList: Todo[]) =>
//             prevTodoList.map(todo =>
//                 todo.id === target.id ? { ...todo, logicalDeleted: !todo.logicalDeleted } : todo
//             )
//         );
//     };

//     return (
//         <TodoContext.Provider value={{ todoList, addTodo, editTodo, proceedStatus, logicalDeleteTodo }}>
//             {children}
//         </TodoContext.Provider>
//     );
// };
