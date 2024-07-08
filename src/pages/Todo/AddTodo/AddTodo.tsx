import React from 'react';
import './AddTodo.css';
import useController, { type Todo } from '../../../hooks/useController';

type AddTodoProps = {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const AddTodo: React.FC<AddTodoProps> = ({ todoList, setTodoList }) => {
  const { handleAdd, handleChange } = useController<Todo>(todoList, setTodoList, 'todo');

  return (
    <div className="flex justify-center flex-column">
      <div className="top-area">
        <p className="top-title">新規登録</p>
      </div>
      <div className="main-area">
        <form>
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
          <button className="add-button primary" type="button" onClick={handleAdd}>登録</button>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
