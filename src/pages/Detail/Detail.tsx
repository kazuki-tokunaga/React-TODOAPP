import React from 'react';
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

  if (!todoId) {
    navigate('/');
    return (<></>);
  }

  const todo = props.todoList.find(t => t.id === parseInt(todoId, 10));

  if (todo === undefined) {
    navigate('/');
    return (<></>);
  }

  const editTodo = (): void => {

  }

  const deleteTodo = (): void => {

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
          />
        </div>
        <div className="my-5">
          <textarea
            className="input-textarea"
            placeholder="内容"
            cols={30}
            rows={10}
          ></textarea>
        </div>
        <div className="flex justify-between my-5 width-full">
          <input className="input-date" type="date" />
          <p>~</p>
          <input className="input-date" type="date" />
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