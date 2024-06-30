import { useState, useEffect, ChangeEventHandler } from 'react';
import { Todo } from '../App';

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

  // console.log(`query:${query}`);
  // console.log(`handleSearchTodo:${typeof handleSearchTodo}`);

  return { query, handleSearchTodo, filteredTodoList };
};

export default useSearch;
