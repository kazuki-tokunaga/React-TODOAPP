import React from 'react';
import { createContext, useState } from 'react';
import './Home.css';
import FilterList from '../../components/FilterList/FilterList';
import TodoList from '../../components/TodoList/TodoList';
import { useNavigate } from 'react-router-dom';
import { Todo } from '../../App';

interface Props {
  proceedStatus: Function;
  todoList: Todo[];
}

export type FilterTypeContextType = {
  filterType: number;
	setFilterType: (filterType: number) => void;
}

export const FilterTypeContext = createContext<FilterTypeContextType>({
  filterType: 0,
  setFilterType: (filterType) => {}
});

const Home: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const todoList = props.todoList;
  const filter = 3;

  const [filterType, setFilterType] = useState<number>(3);

  return (
    <div>
      <div className="top-area">
        <p className="top-title">TOP (予定一覧表示)</p>
      </div>
      <div className="main-area">
        <FilterTypeContext.Provider value={{ filterType, setFilterType }}>
          <FilterList filter={filter}></FilterList>
          <div className="flex justify-center">
            <ul className="todo-list">
              <li>
                <button
                  onClick={() => navigate('add')}
                  className="add-button primary"
                >
                  新規登録
                </button>
              </li>
              {(() => {
                if (todoList.length <= 0) {
                  return <li>登録されている予定はありません。</li>;
                } else {
                  return todoList
                    .filter(todo => filterType === 3 ? true : todo.status === filterType)
                    .sort((a, b) => a.startDate > b.startDate ? 1 : -1)
                    .map((todo) =>
                    <li key={todo.id}>
                      <TodoList proceedStatus={props.proceedStatus} todo={todo}></TodoList>
                    </li>
                  )
                }
              })()}
            </ul>
          </div>
        </FilterTypeContext.Provider>
      </div>
    </div>
  );
};

export default Home;
