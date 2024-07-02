import React from 'react';
import './Add.css';
import { useTodoList, type Todo } from '../../hooks/useTodoList';

const Add: React.FC = () => {
  const { handleAddTodo, handleChange } = useTodoList();

  return (
    <div className="flex justify-center flex-column">
      <div className="top-area">
        <p className="top-title">新規登録</p>
      </div>
      <div className="main-area">
        <div className="my-5">
          <input
            className="input-text"
            placeholder="タイトル"
            type="text"
            onChange={handleChange('title')}
          />
        </div>
        <div className="my-5">
          <textarea
            className="input-textarea"
            placeholder="内容"
            name=""
            id=""
            cols={30}
            rows={10}
            onChange={handleChange('description')}
          ></textarea>
        </div>
        <div className="flex justify-between my-5 width-full">
          <input className="input-date" type="date" onChange={handleChange('startDate')} />
          <p>~</p>
          <input className="input-date" type="date" onChange={handleChange('endDate')} />
        </div>
        <button onClick={handleAddTodo} className="add-button primary" type="submit">登録</button>
      </div>
    </div>
  );
};

export default Add;
