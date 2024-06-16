import React from 'react';
import { useState, useEffect } from 'react';
import './Detail.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Todo } from '../../App';

interface Props {
  todoList: Todo[];
  editTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}

const Detail: React.FC<Props> = (props) => {
  const { todoId } = useParams()
  const navigate = useNavigate();

  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (!todoId) {
      navigate('/');
      return;
    }

    const todo = props.todoList.find(t => t.id === parseInt(todoId, 10));

    if (!todo) {
      navigate('/');
      return;
    }

    setCurrentTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
    setStartDate(todo.startDate);
    setEndDate(todo.endDate);
  }, [todoId, navigate]);

  const editTodo = (): void => {
    if (!currentTodo) return;

    const newTodo = {
      id: currentTodo.id,
      status: currentTodo.status,
      title,
      description,
      startDate,
      endDate,
    }
    props.editTodo(newTodo);
    navigate('/');
  }

  const deleteTodo = (): void => {
    if (!currentTodo) return;
    props.deleteTodo(currentTodo);
    navigate('/');
    return;
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="my-5">
          <textarea
            className="input-textarea"
            placeholder="内容"
            cols={30}
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-between my-5 width-full">
          <input
            className="input-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <p>~</p>
          <input
            className="input-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="flex flex-row gap-16">
          <button className="edit-button positive" onClick={editTodo}>更新</button>
          <button className="delete-button critical" onClick={deleteTodo}>削除</button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
