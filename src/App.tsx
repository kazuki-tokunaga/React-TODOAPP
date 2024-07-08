import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import TodoHome from './pages/Todo/HomeTodo/HomeTodo';
import UserHome from './pages/User/HomeUser/HomeUser';
import AddTodo from './pages/Todo/AddTodo/AddTodo';
import AddUser from './pages/User/AddUser/AddUser';
import TodoDetail from './pages/Todo/DetailTodo/DetailTodo';
import UserDetail from './pages/User/DetailUser/DetailUser';

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

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [userList, setUserList] = useState<User[]>([]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/todo" element={<TodoHome todoList={todoList} />} />
        <Route path="/todo/add" element={<AddTodo todoList={todoList} setTodoList={setTodoList} />} />
        <Route path="/todo/detail/:todoId" element={<TodoDetail todoList={todoList} setTodoList={setTodoList} />} />
        <Route path="/user" element={<UserHome userList={userList} />} />
        <Route path="/user/add" element={<AddUser userList={userList} setUserList={setUserList} />} />
        <Route path="/user/detail/:userId" element={<UserDetail userList={userList} setUserList={setUserList} />} />
      </Routes>
    </div>
  );
}

export default App;
