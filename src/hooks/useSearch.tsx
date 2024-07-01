import { useState, useEffect, ChangeEventHandler } from 'react';
import { useTodoList, type Todo } from '../hooks/useTodoList';
// import { type Todo } from '../contexts/TodoContext';

type UseSearch = {
  query: string;
  filteredTodoList: Todo[];
  handleSearchTodo: ChangeEventHandler<HTMLInputElement>;
}

const useSearch = (todoList: Todo[]): UseSearch => {
  const [query, setQuery] = useState<string>('');
  const [filteredTodoList, setFilteredTodoList] = useState<Todo[]>(todoList);

  useEffect(() => {
    setFilteredTodoList(
      todoList.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query]);

  const handleSearchTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return { query, handleSearchTodo, filteredTodoList };
};

export default useSearch;
