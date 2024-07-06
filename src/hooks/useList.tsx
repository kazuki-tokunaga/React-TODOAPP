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
};

export const useList = () => {
	type TodoField = 'title' | 'description' | 'startDate' | 'endDate';
	const navigate = useNavigate();
	const [todoList, setTodoList] = useState<Todo[]>([]);
	const [newTodo, setNewTodo] = useState<Todo>({
		id: new Date().getTime(),
		status: 0,
		title: '',
		description: '',
		startDate: '',
		endDate: '',
		logicalDeleted: false,
	});

	const handleChangeTodo = <T extends HTMLInputElement | HTMLTextAreaElement>(
		field: TodoField,
	) => (e: React.ChangeEvent<T>) => {
		const value = e.target.value;
		setNewTodo((prevNewTodo) => ({
			...prevNewTodo,
			[field]: value,
		}));
	};

	// レンダリング後のログ確認用
	useEffect(() => {
		console.log('todoList updated:', todoList);
	}, [todoList]);

	const handleAddTodo = (e: React.FormEvent) => {
		e.preventDefault();

		setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
		console.log('newTodo:', newTodo);

		// 更新後シミュレーション
		const nextTodoList = [...todoList, newTodo];
		console.log('nextTodoList:', nextTodoList);

		setNewTodo({
			id: new Date().getTime(),
			status: 0,
			title: '',
			description: '',
			startDate: '',
			endDate: '',
			logicalDeleted: false,
		});

		navigate("/");
	};

	const editTodo = (todo: Todo): void => {
		setTodoList((prevTodoList) =>
			prevTodoList.map((t) => (t.id === todo.id ? todo : t))
		);
	};

	const proceedStatus = (id: number): void => {
		setTodoList((prevTodoList) =>
			prevTodoList.map((todo) =>
				todo.id === id ? { ...todo, status: Math.min(todo.status + 1, 2) } : todo
			)
		);
	};

	const logicalDeleteTodo = (target: Todo): void => {
		setTodoList((prevTodoList) =>
			prevTodoList.map((todo) =>
				todo.id === target.id ? { ...todo, logicalDeleted: !todo.logicalDeleted } : todo
			)
		);
	};

	return { todoList, editTodo, proceedStatus, logicalDeleteTodo, handleChangeTodo, handleAddTodo };
};

export default useList;
