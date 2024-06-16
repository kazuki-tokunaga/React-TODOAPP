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
  let [todoList, setTodoList] = useState<Todo[]>([]);

  const addTodo = (todo: Todo): void => {
    let maxId: number = 0;
    todoList.forEach((todo: Todo) => {
      if (!maxId) {
        maxId = todo.id;
      }
    })

    todoList.push(Object.assign({}, todo, { id: maxId + 1 }));
    setTodoList([...todoList]);
  };

  const editTodo = (newTodo: Todo): void => {
    setTodoList(todoList.map(todo => (todo.id === newTodo.id ? newTodo : todo)));
    // //模範回答
    // const editTodo = (todo: Todo): void => {
    //   const index = todoList.findIndex(t => t.id === todo.id);
    //   todoList.splice(index, 1, todo);
    // }
  }

  const deleteTodo = (target: Todo): void => {
    setTodoList(todoList.filter(todo => (todo.id !== target.id)));
    // //模範回答
    // todoList = todoList.filter(todo => todo.id !== target.id);
    // setTodoList([...todoList]);
  }

  // 孫コンポーネントから実行される、todoListのtodo.statusを変更するための関数
  const proceedStatus = (id: number): void => {
    //模範回答
    const index = todoList.findIndex(t => t.id === id);
    if (index === -1) {
      return;
    }

    todoList[index].status = Math.min(todoList[index].status + 1, 2);

    setTodoList([...todoList]);
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
