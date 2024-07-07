import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export type Todo = {
	readonly id: number;
	status: number;
	title: string;
	description: string;
	startDate: string;
	endDate: string;
	logicalDeleted: boolean;
};

export const useController = (todoList: Todo[], setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>) => {
	type TodoField = 'title' | 'description' | 'startDate' | 'endDate';
	const navigate = useNavigate();
	const { todoId } = useParams<{ todoId: string }>();

	const [newTodo, setNewTodo] = useState<Todo>({
		id: new Date().getTime(),
		status: 0,
		title: '',
		description: '',
		startDate: '',
		endDate: '',
		logicalDeleted: false,
	});

	useEffect(() => {
		if (todoId) {
			const todo = todoList.find(t => t.id === parseInt(todoId, 10));
			if (todo) {
				setNewTodo(todo);
			}
		}
		console.log('todoList', todoList);
	}, [todoId, todoList]);

	// チェンジイベント
	const handleChangeTodo = <T extends HTMLInputElement | HTMLTextAreaElement>(
		field: TodoField,
	) => (e: React.ChangeEvent<T>) => {
		const value = e.target.value;
		setNewTodo((prevNewTodo) => ({
			...prevNewTodo,
			[field]: value,
		}));
	};

	// 登録処理
	const handleAddTodo = (e: React.FormEvent) => {
		e.preventDefault();
		setTodoList([...todoList, newTodo]);
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

	// 更新処理
	const handleEditTodo = (e: React.FormEvent): void => {
		e.preventDefault();
		if (!todoId) return;

		setTodoList((prevTodoList) =>
			prevTodoList.map(todo =>
				todo.id === parseInt(todoId, 10) ? { ...todo, ...newTodo } : todo
			)
		);

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

	// 削除処理
	const handleLogicalDeleteTodo = (e: React.FormEvent): void => {
		e.preventDefault();
		if (!todoId) return;

		setTodoList((prevTodoList) =>
			prevTodoList.map(todo =>
				todo.id === parseInt(todoId, 10) ? { ...todo, logicalDeleted: !todo.logicalDeleted } : todo
			)
		);

		navigate("/");
	}

	return { handleChangeTodo, handleAddTodo, handleEditTodo, handleLogicalDeleteTodo };
};

export default useController;
