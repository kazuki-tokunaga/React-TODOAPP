import React from 'react';
import './Detail.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Todo } from '../../App';

interface Props {
  todoList: Todo[];
  editTodo: (todo: Todo) => void;
  logicalDeleteTodo: (todo: Todo) => void;
}

const Detail: React.FC<Props> = (props) => {
  const { todoId } = useParams()
  const navigate = useNavigate();

  type TodoField = 'title' | 'description' | 'startDate' | 'endDate';

  if (!todoId) {
    navigate('/');
    return (<></>);
  }

  const todo = props.todoList.find(t => t.id === parseInt(todoId, 10));

  if (todo === undefined) {
    navigate('/');
    return (<></>);
  }

  const handleChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    field: TodoField,
  ) => (e: React.ChangeEvent<T>) => {
    const target = e.target as T;
    todo[field] = target.value;
  };

  const handleChangeTitle = handleChange<HTMLInputElement>('title');
  const handleChangeDescription = handleChange<HTMLTextAreaElement>('description');
  const handleChangeStartDate = handleChange<HTMLInputElement>('startDate');
  const handleChangeEndDate = handleChange<HTMLInputElement>('endDate');

  // const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   todo.title = e.target.value;
  // };
  // const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   todo.description = e.target.value;
  // };
  // const handleChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   todo.startDate = e.target.value;
  // };
  // const handleChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   todo.endDate = e.target.value;
  // };

  const handleEditTodo = (e: React.FormEvent) => {
    e.preventDefault();
    props.editTodo(todo);
    navigate('/');
  }
  const handleLogicalDeleteTodo = (e: React.FormEvent) => {
    e.preventDefault();
    props.logicalDeleteTodo(todo);
    navigate('/');
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
            onChange={handleChangeTitle}
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
            onChange={handleChangeDescription}
          ></textarea>
        </div>
        <div className="flex justify-between my-5 width-full">
          <input className="input-date" defaultValue={todo.startDate} type="date" onChange={handleChangeStartDate} />
          <p>~</p>
          <input className="input-date" defaultValue={todo.endDate} type="date" onChange={handleChangeEndDate} />
        </div>
        <div className="flex flex-row gap-16">
          <form onSubmit={handleEditTodo}>
            <button className="edit-button positive">更新</button>
          </form>
          <form onSubmit={handleLogicalDeleteTodo}>
            <button className="delete-button critical">削除</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Detail;
