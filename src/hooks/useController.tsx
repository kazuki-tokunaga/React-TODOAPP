import { useState, useEffect, ChangeEventHandler, MouseEventHandler } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export type Todo = {
	readonly id: number;
	status: number;
	title: string;
	description: string;
	startDate: string;
	endDate: string;
	logicalDeleted: boolean;
};

export type User = {
	readonly id: number;
	name: string;
	email: string;
	logicalDeleted: boolean;
};

// ユニオン型
export type Controllable = Todo | User;

type UseController<T extends Controllable> = {
	handleChange: (field: keyof T) => ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	handleAdd: MouseEventHandler<HTMLButtonElement>;
	handleEdit: MouseEventHandler<HTMLButtonElement>;
	handleLogicalDelete: MouseEventHandler<HTMLButtonElement>;
};

// ジェネリック型の制約
export const useController = <T extends Controllable>(
	list: T[],
	setList: React.Dispatch<React.SetStateAction<T[]>>,
	type: 'todo' | 'user',
	itemId?: string
): UseController<T> => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const [newItem, setNewItem] = useState<Partial<T>>({});

	useEffect(() => {
		const currentId = itemId ?? id;
		if (currentId) {
			const item = list.find(t => t.id === parseInt(currentId, 10));
			if (item) {
				setNewItem(item);
			}
		}
	}, [itemId, id, list]);

	// チェンジイベント
	const handleChange = (field: keyof T): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => (e) => {
		const { value } = e.target;
		setNewItem((prevNewItem) => ({
			...prevNewItem,
			[field]: value,
		}));
	};

	// 登録処理
	const handleAdd: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		const itemWithId = { ...newItem, id: new Date().getTime() } as T;
		setList((prevList) => [...prevList, itemWithId]);
		setNewItem({});
		navigate(`/${type}`);
	};

	// 更新処理
	const handleEdit: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		const currentId = itemId ?? id;
		if (!currentId) return;

		setList((prevList) =>
			prevList.map(item =>
				item.id === parseInt(currentId, 10) ? { ...item, ...newItem } : item
			)
		);

		setNewItem({});
		navigate(`/${type}`);
	};

	// 削除処理
	const handleLogicalDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		const currentId = itemId ?? id;
		if (!currentId) return;

		setList((prevList) =>
			prevList.map(item =>
				item.id === parseInt(currentId, 10) ? { ...item, logicalDeleted: !item.logicalDeleted } : item
			)
		);

		navigate(`/${type}`);
	};

	return { handleChange, handleAdd, handleEdit, handleLogicalDelete };
};

export default useController;
