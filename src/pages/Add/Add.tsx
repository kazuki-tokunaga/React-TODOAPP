import React from 'react';
import './Add.css';
import { useList, type Todo } from '../../hooks/useList';

const Add: React.FC = () => {
  const { handleAddTodo, handleChangeTodo } = useList();

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
            onChange={handleChangeTodo('title')}
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
            onChange={handleChangeTodo('description')}
          ></textarea>
        </div>
        <div className="flex justify-between my-5 width-full">
          <input className="input-date" type="date" onChange={handleChangeTodo('startDate')} />
          <p>~</p>
          <input className="input-date" type="date" onChange={handleChangeTodo('endDate')} />
        </div>
        <button onClick={handleAddTodo} className="add-button primary" type="submit">登録</button>
      </div>
    </div>
  );
};

export default Add;
