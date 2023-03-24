import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Add from './pages/Add/Add';
import Detail from './pages/Detail/Detail';

export type Todo = {
  id: number,
  status: number,
  title: string,
  description: string,
  startDate: string,
  endDate: string
}

function App() {
  let [todoList, setTodoList] = useState([] as Todo[])

  const addTodo = (todo: Todo): void => {
    let maxId: number = 0;
    todoList.forEach((todo: Todo) => {
      if (!maxId || todo.id > maxId ) {
        maxId = todo.id;
      }
    })

    todoList.push(Object.assign({}, todo, {id: maxId + 1}));
    setTodoList([...todoList]);
  };

  const editTodo = (todo: Todo): void => {

  }

  const deleteTodo = (target: Todo): void => {

  }

  const proceedStatus = (id: number): void => {

  }

  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home proceedStatus={proceedStatus} todoList={todoList} />} />
        <Route path="/add" element={<Add addTodo={addTodo} />} />
        <Route path="/detail/:todoId" element={<Detail todoList={todoList} editTodo={editTodo} deleteTodo={deleteTodo} />} />
      </Routes>
    </div>
  );
}

export default App;
