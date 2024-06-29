import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Add from './pages/Add/Add';
import Detail from './pages/Detail/Detail';

export type Todo = {
  readonly id: number;
  status: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  logicalDeleted: boolean;
}

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const addTodo = (todo: Todo): void => {
    const newTodo: Todo = { ...todo, id: new Date().getTime() };
    setTodoList((prevTodoList: Todo[]) => [...prevTodoList, newTodo]);
  };

  const editTodo = (todo: Todo): void => {
    setTodoList((prevTodoList: Todo[]) =>
      prevTodoList.map(t => (t.id === todo.id ? todo : t))
    );
  };

  const proceedStatus = (id: number): void => {
    setTodoList((prevTodoList: Todo[]) =>
      prevTodoList.map(todo =>
        todo.id === id ? { ...todo, status: Math.min(todo.status + 1, 2) } : todo
      )
    );
  };

  const logicalDeleteTodo = (target: Todo): void => {
    setTodoList((prevTodoList: Todo[]) =>
      prevTodoList.map(todo =>
        todo.id === target.id ? { ...todo, logicalDeleted: !todo.logicalDeleted } : todo
      )
    );
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home proceedStatus={proceedStatus} todoList={todoList} />} />
        <Route path="/add" element={<Add addTodo={addTodo} />} />
        <Route path="/detail/:todoId" element={<Detail todoList={todoList} editTodo={editTodo} logicalDeleteTodo={logicalDeleteTodo} />} />
      </Routes>
    </div>
  );
}

export default App;
