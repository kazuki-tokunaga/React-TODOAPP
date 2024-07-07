import './App.css';
import { useState } from 'react';
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
};

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home todoList={todoList} />} />
        <Route path="/add" element={<Add todoList={todoList} setTodoList={setTodoList} />} />
        <Route path="/detail/:todoId" element={<Detail todoList={todoList} setTodoList={setTodoList} />} />
      </Routes>
    </div>
  );
}

export default App;
