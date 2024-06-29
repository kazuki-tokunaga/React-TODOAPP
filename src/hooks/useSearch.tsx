import { useState, useEffect } from 'react';
import { Todo } from '../App';

const useSearch = (todoList: Todo[]) => {
  const [query, setQuery] = useState<string>('');
  const [filteredTodoList, setFilteredTodoList] = useState<Todo[]>(todoList);

  useEffect(() => {
    setFilteredTodoList(
      todoList.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, todoList]);

  const handleSearchTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return { query, handleSearchTodo, filteredTodoList };
};

export default useSearch;
