import React from 'react';
import './UserList.css';
import { useNavigate } from 'react-router-dom';
import { type User } from '../../hooks/useController';

interface Props {
  user: User;
}

const UserList: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="user-description text-left">
        <p>{user.name}</p>
        <p>{user.email}</p>
      </div>
      <div className="button-area">
        <button
          onClick={() => navigate('detail/' + user.id)}
          className="positive"
        >
          詳細
        </button>
      </div>
    </div>
  );
};

export default UserList;
