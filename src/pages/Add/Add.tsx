import React from 'react';
import './Add.css';
import { useNavigate } from 'react-router-dom';
import { useTodoContext, type Todo } from '../../contexts/TodoContext';

const Add: React.FC = () => {
  const navigate = useNavigate();
  type TodoField = 'title' | 'description' | 'startDate' | 'endDate';

  const newTodo: Todo = {
    id: new Date().getTime(),
    status: 0,
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    logicalDeleted: false
  };

  const handleChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    field: TodoField,
  ) => (e: React.ChangeEvent<T>) => {
    const target = e.target as T;
    newTodo[field] = target.value;
  };

  const { addTodo } = useTodoContext();

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(newTodo);
    navigate('/');
  };

  return (
    <form onSubmit={handleAddTodo}>
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
          <button className="add-button primary" type="submit">登録</button>
        </div>
      </div>
    </form>
  );
};

export default Add;
