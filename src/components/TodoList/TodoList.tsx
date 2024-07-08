import React from 'react';
import './TodoList.css';
import { useNavigate } from 'react-router-dom';
import { type Todo } from '../../hooks/useController';

interface Props {
  todo: Todo;
}

const TodoList: React.FC<Props> = ({ todo }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="todo-description text-left">
        <p className={todo.status === 2 ? 'done' : ''}>
          {todo.title}
        </p>
        <p>{todo.startDate} ~ {todo.endDate}</p>
      </div>
      <div className="button-area">
        <button
          onClick={() => navigate('detail/' + todo.id)}
          className="positive"
        >
          詳細
        </button>
      </div>
    </div>
  );
};

export default TodoList;
