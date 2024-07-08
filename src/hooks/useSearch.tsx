import { useState, useEffect, ChangeEventHandler } from 'react';

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
export type Searchable = Todo | User;

type UseSearch<T extends Searchable> = {
  query: string;
  filteredList: T[];
  handleSearch: ChangeEventHandler<HTMLInputElement>;
}

// ジェネリック型の制約
const useSearch = <T extends Searchable>(list: T[]): UseSearch<T> => {
  const [query, setQuery] = useState<string>('');
  const [filteredList, setFilteredList] = useState<T[]>(list);

  useEffect(() => {
    setFilteredList(
      list.filter(item =>
        ('title' in item && item.title.toLowerCase().includes(query.toLowerCase())) ||
        ('name' in item && item.name.toLowerCase().includes(query.toLowerCase()))
      )
    );
  }, [query, list]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return { query, handleSearch, filteredList };
};

export default useSearch;
