import React, { useEffect } from 'react';
import './DetailTodo.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useController, type Todo } from '../../../hooks/useController';

type TodoAddProps = {
	todoList: Todo[];
	setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const DetailTodo: React.FC<TodoAddProps> = ({ todoList, setTodoList }) => {
	const { todoId } = useParams<{ todoId: string }>();
	const navigate = useNavigate();
	const { handleChange, handleEdit, handleLogicalDelete } = useController<Todo>(todoList, setTodoList, 'todo', todoId);

	useEffect(() => {
		if (!todoId) {
			navigate('/');
		}
	}, [todoId, navigate]);

	const todo = todoList.find(t => t.id === parseInt(todoId!, 10));

	useEffect(() => {
		if (todo === undefined) {
			navigate('/');
		}
	}, [todo, navigate]);

	if (todo === undefined) {
		return null;
	}

	return (
		<div className="flex justify-center flex-column">
			<div className="top-area">
				<p className="top-title">予定詳細</p>
			</div>
			<div className="main-area">
				<div className="my-5">
					<input
						className="input-text"
						placeholder="タイトル"
						type="text"
						defaultValue={todo.title}
						onChange={handleChange('title')}
					/>
				</div>
				<div className="my-5">
					<textarea
						className="input-textarea"
						placeholder="内容"
						defaultValue={todo.description}
						name=""
						id=""
						cols={30}
						rows={10}
						onChange={handleChange('description')}
					></textarea>
				</div>
				<div className="flex justify-between my-5 width-full">
					<input className="input-date" defaultValue={todo.startDate} type="date" onChange={handleChange('startDate')} />
					<p>~</p>
					<input className="input-date" defaultValue={todo.endDate} type="date" onChange={handleChange('endDate')} />
				</div>
				<div className="flex flex-row gap-16">
					<button onClick={handleEdit} className="edit-button positive">更新</button>
					<button onClick={handleLogicalDelete} className="delete-button critical">削除</button>
				</div>
			</div>
		</div>
	);
};

export default DetailTodo;
