import React from 'react';
import './AddUser.css';
import useController, { type User } from '../../../hooks/useController';

type UserAddProps = {
  userList: User[];
  setUserList: React.Dispatch<React.SetStateAction<User[]>>;
};

const AddUser: React.FC<UserAddProps> = ({ userList, setUserList }) => {
  const { handleAdd, handleChange } = useController<User>(userList, setUserList, 'user');

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
              placeholder="名前"
              type="text"
              name="name"
              onChange={handleChange('name')}
            />
          </div>
          <div className="my-5">
            <input
              className="input-text"
              placeholder="メールアドレス"
              type="email"
              name="email"
              onChange={handleChange('email')}
            />
          </div>
          <button className="add-button primary" type="button" onClick={handleAdd}>登録</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
