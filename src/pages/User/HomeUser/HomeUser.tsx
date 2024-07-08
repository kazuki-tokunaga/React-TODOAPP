import React from 'react';
import './HomeUser.css';
import UserList from '../../../components/UserList/UserList';
import { useNavigate } from 'react-router-dom';
import useSearch from '../../../hooks/useSearch';
import { type User } from '../../../hooks/useController';

type UserProps = {
  userList: User[];
}

const HomeUser: React.FC<UserProps> = ({ userList }) => {
  const navigate = useNavigate();
  const { query, handleSearch, filteredList } = useSearch<User>(userList);
  const visibleUserList = filteredList.filter(user => !user.logicalDeleted);

  return (
    <div className="user-home">
      <div className="top-area">
        <p className="top-title">TOP (ユーザー一覧表示)</p>
      </div>
      <div className="main-area">
        <div className="search-container">
          <input
            type="text"
            placeholder="user検索"
            value={query}
            onChange={handleSearch}
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
        <div className="user-list-container">
          <ul className="user-list">
            {visibleUserList.length <= 0 ? (
              <li>登録されているユーザーはいません。</li>
            ) : (
              visibleUserList.map(user => (
                <li key={user.id} className="user-item">
                  <UserList user={user} />
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeUser;
