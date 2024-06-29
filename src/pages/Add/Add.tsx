import React from 'react';
import './Add.css';
import { useNavigate } from 'react-router-dom';
import { Todo } from '../../App';

interface Props {
  addTodo: (todo: Todo) => void;
}

const Add: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const newTodo: Todo = {
    id: new Date().getTime(),
    status: 0,
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    logicalDeleted: false,
  };

  type TodoField = 'title' | 'description' | 'startDate' | 'endDate';

  const handleChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    field: TodoField,
  ) => (e: React.ChangeEvent<T>) => {
    const target = e.target as T;
    newTodo[field] = target.value;
  };

  const handleChangeTitle = handleChange<HTMLInputElement>('title');
  const handleChangeDescription = handleChange<HTMLTextAreaElement>('description');
  const handleChangeStartDate = handleChange<HTMLInputElement>('startDate');
  const handleChangeEndDate = handleChange<HTMLInputElement>('endDate');

  // const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   newTodo.title = e.target.value;
  // };
  // const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   newTodo.description = e.target.value;
  // };
  // const handleChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   newTodo.startDate = e.target.value;
  // };
  // const handleChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   newTodo.endDate = e.target.value;
  // };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    props.addTodo(newTodo);
    navigate('/');
  }

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
              onChange={handleChangeTitle}
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
              onChange={handleChangeDescription}
            ></textarea>
          </div>
          <div className="flex justify-between my-5 width-full">
            <input className="input-date" type="date" onChange={handleChangeStartDate} />
            <p>~</p>
            <input className="input-date" type="date" onChange={handleChangeEndDate} />
          </div>
          <button className="add-button primary" type="submit">登録</button>
        </div>
      </div>
    </form>
  );
};

export default Add;
