import React from 'react';
import './HomeTodo.css';
import { useNavigate } from 'react-router-dom';
import useSearch from '../../../hooks/useSearch';
import { Todo } from '../../../hooks/useController';

type TodoProps = {
  todoList: Todo[];
}

const TodoHome: React.FC<TodoProps> = ({ todoList }) => {
  const navigate = useNavigate();
  const { query, handleSearch, filteredList } = useSearch(todoList);
  const visibleTodoList = filteredList.filter(todo => !todo.logicalDeleted);

  return (
    <div className="todo-home">
      <div className="top-area">
        <p className="top-title">TOP (予定一覧表示)</p>
      </div>
      <div className="main-area">
        <div className="search-container">
          <input
            type="text"
            placeholder="todo検索"
            value={query}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <div className="control-area">
          <div></div>
          <button
            onClick={() => navigate('/todo/add')}
            className="add-button primary"
          >
            新規登録
          </button>
        </div>
        <div className="todo-list-container">
          <ul className="todo-list">
            {visibleTodoList.length <= 0 ? (
              <li>登録されている予定はありません。</li>
            ) : (
              visibleTodoList
                .sort((a, b) => (a.startDate > b.startDate ? 1 : -1))
                .map(todo => (
                  <li key={todo.id} className="todo-item">
                    <div className="todo-description">
                      <p className={todo.status === 2 ? 'done' : ''}>
                        {todo.title}
                      </p>
                      <p>{todo.startDate} ~ {todo.endDate}</p>
                    </div>
                    <div className="button-area">
                      <button
                        onClick={() => navigate(`/todo/detail/${todo.id}`)}
                        className="detail-button positive"
                      >
                        詳細
                      </button>
                    </div>
                  </li>
                ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoHome;
