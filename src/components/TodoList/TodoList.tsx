import React from 'react';
import './TodoList.css';
import { useNavigate } from 'react-router-dom';
import { Todo } from '../../App';

interface Props {
  proceedStatus: Function;
  todo: Todo;
}

const TodoList: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const statusNameList: { [key: number]: string } = {
    0: '未着手',
    1: '作業中',
    2: '完了'
  }

  const buttonClassList: { [key: number]: string } = {
    0: 'secondary',
    1: 'warning',
    2: 'critical'
  };

  const todo = props.todo;

  const getButtonClass = (): string => {
    return buttonClassList[todo.status];
  }

  const getStatusName = (): string => {
    return statusNameList[todo.status];
  }

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="todo-description text-left">
        {/* todoのstatusが2であればclassName='done'を付与する */}
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

        <button
          className={`button ${getButtonClass()}`}
          onClick={() => props.proceedStatus(todo.id)}
        >
          {getStatusName()}
        </button>
      </div>
    </div>
  );
};

export default TodoList;
