import React from 'react';
import './Add.css';
import { useNavigate } from 'react-router-dom';
import { Todo } from '../../App';

interface Props {
  addTodo: (todo: Todo) => void;
}

const Add: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const todo: Todo = { id: 0, status: 0, title: '', description: '', startDate: '', endDate: '' };

  const addTodo = (): void => {
    props.addTodo(todo);
    navigate('/');
  }

  return (
    <div className="flex justify-ce nter flex-column">
      <div className="top-area">
        <p className="top-title">新規登録</p>
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

        <button className="add-button primary" onClick={addTodo}>登録</button>
      </div>
    </div>
  );
};

export default Add;
