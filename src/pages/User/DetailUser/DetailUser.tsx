import React, { useEffect } from 'react';
import './DetailUser.css';
import { useNavigate, useParams } from 'react-router-dom';
import useController, { type User } from '../../../hooks/useController';

type UserAddProps = {
	userList: User[];
	setUserList: React.Dispatch<React.SetStateAction<User[]>>;
};

const DetailUser: React.FC<UserAddProps> = ({ userList, setUserList }) => {
	const { userId } = useParams<{ userId: string }>();
	const navigate = useNavigate();
	const { handleChange, handleEdit, handleLogicalDelete } = useController<User>(userList, setUserList, 'user', userId);

	useEffect(() => {
		if (!userId) {
			navigate('/');
		}
	}, [userId, navigate]);

	const user = userList.find(t => t.id === parseInt(userId!, 10));

	useEffect(() => {
		if (user === undefined) {
			navigate('/');
		}
	}, [user, navigate]);

	if (user === undefined) {
		return null;
	}

	return (
		<div className="flex justify-center flex-column">
			<div className="top-area">
				<p className="top-title">ユーザー詳細</p>
			</div>
			<div className="main-area">
				<div className="my-5">
					<input
						className="input-text"
						placeholder="名前"
						type="text"
						defaultValue={user.name}
						onChange={handleChange('name')}
					/>
				</div>
				<div className="my-5">
					<input
						className="input-text"
						placeholder="メールアドレス"
						type="email"
						defaultValue={user.email}
						onChange={handleChange('email')}
					/>
				</div>
				<div className="flex flex-row gap-16">
					<button onClick={handleEdit} className="edit-button positive">更新</button>
					<button onClick={handleLogicalDelete} className="delete-button critical">削除</button>
				</div>
			</div>
		</div>
	);
};

export default DetailUser;
