import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


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
	type TodoField = 'title' | 'description' | 'startDate' | 'endDate';
	const navigate = useNavigate();
	const [todoList, setTodoList] = useState<Todo[]>([]);
	const newTodo = {
		id: new Date().getTime(),
		status: 0,
		title: '',
		description: '',
		startDate: '',
		endDate: '',
		logicalDeleted: false,
	};

	const handleChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
		field: TodoField,
	) => (e: React.ChangeEvent<T>) => {
		console.log('field:', field);
		const target = e.target as T;
		console.log('target:', target);
		newTodo[field] = target.value;
		console.log('handleChange:', newTodo);
	};

	const handleAddTodo = (e: React.FormEvent) => {
		e.preventDefault();
		setTodoList([...todoList, newTodo]);
		console.log('newTodo:', newTodo);
		console.log('handleAddTodo:', todoList);
		navigate('/');
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

	return { todoList, editTodo, proceedStatus, logicalDeleteTodo, handleChange, handleAddTodo };
};

export default useTodoList;
