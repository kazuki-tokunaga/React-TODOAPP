import { useState } from 'react';

export type Todo = {
	readonly id: number;
	status: number;
	title: string;
	description: string;
	startDate: string;
	endDate: string;
	logicalDeleted: boolean;
}


export const useTodoList = () => {
	const [todoList, setTodoList] = useState<Todo[]>([]);

	const addTodo = (todo: Todo): void => {
		const newTodo: Todo = { ...todo, id: new Date().getTime() };
		setTodoList((prevTodoList: Todo[]) => [...prevTodoList, newTodo]);
		console.log('登録しました');
	};

	const editTodo = (todo: Todo): void => {
		setTodoList((prevTodoList: Todo[]) =>
			prevTodoList.map(t => (t.id === todo.id ? todo : t))
		);
	};

	const proceedStatus = (id: number): void => {
		setTodoList((prevTodoList: Todo[]) =>
			prevTodoList.map(todo =>
				todo.id === id ? { ...todo, status: Math.min(todo.status + 1, 2) } : todo
			)
		);
	};

	const logicalDeleteTodo = (target: Todo): void => {
		setTodoList((prevTodoList: Todo[]) =>
			prevTodoList.map(todo =>
				todo.id === target.id ? { ...todo, logicalDeleted: !todo.logicalDeleted } : todo
			)
		);
	};

	return { todoList, addTodo, editTodo, proceedStatus, logicalDeleteTodo };
};

export default useTodoList;
