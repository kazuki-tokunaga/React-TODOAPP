import React from 'react';
import { useContext } from "react";
import { FilterTypeContext } from '../../pages/Home/Home';
import './FilterList.css';

interface Props {
  filter: number;
}

const FilterList: React.FC<Props> = (props) => {

  const filterTypes = [
    { value: 3, id: 'all', name: 'すべて' },
    { value: 0, id: 'not-yet', name: '未着手' },
    { value: 1, id: 'working', name: '作業中' },
    { value: 2, id: 'completed', name: '完了' }
  ];

  return (
    <div className="filter-area">
      <ul>
        {filterTypes.map((ft) => {
          return (
            <li key={ft.id}>
              <label htmlFor={ft.id}>{ft.name}</label>
              <input
                type="radio"
                name="filter"
                id={ft.id}
                value={ft.value}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FilterList;
