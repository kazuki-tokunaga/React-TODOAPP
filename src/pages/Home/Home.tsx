import React, { useContext, useState } from 'react';
import './Home.css';
import FilterList from '../../components/FilterList/FilterList';
import TodoList from '../../components/TodoList/TodoList';
import { useNavigate } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import { useList, type Todo } from '../../hooks/useList';
// import { useTodoContext } from '../../contexts/TodoContext';

export const FilterTypeContext = React.createContext<{
  filterType: number;
  setFilterType: (filterType: number) => void;
}>({
  filterType: 0,
  setFilterType: () => { },
});

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { todoList } = useList();
  const { query, handleSearchTodo, filteredTodoList } = useSearch(todoList);
  const [filterType, setFilterType] = useState<number>(3);
  const visibleTodoList = filteredTodoList.filter(todo => !todo.logicalDeleted);

  return (
    <div>
      <div className="top-area">
        <p className="top-title">TOP (予定一覧表示)</p>
      </div>
      <div className="main-area">
        <FilterTypeContext.Provider value={{ filterType, setFilterType }}>
          <FilterList filter={filterType} />
          <div className="search-container">
            <input
              type="text"
              placeholder="todo検索"
              value={query}
              onChange={handleSearchTodo}
              className="search-input"
            />
          </div>
          <div className="control-area">
            <div></div>
            <button
              onClick={() => navigate('add')}
              className="add-button primary"
            >
              新規登録
            </button>
          </div>
          <div className="flex justify-center">
            <ul className="todo-list">
              {visibleTodoList.length <= 0 ? (
                <li>登録されている予定はありません。</li>
              ) : (
                visibleTodoList
                  .filter(todo => (filterType === 3 ? true : todo.status === filterType))
                  .sort((a, b) => (a.startDate > b.startDate ? 1 : -1))
                  .map(todo => (
                    <li key={todo.id}>
                      <TodoList todo={todo} />
                    </li>
                  ))
              )}
            </ul>
          </div>
        </FilterTypeContext.Provider>
      </div>
    </div>
  );
};

export default Home;
