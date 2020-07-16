import React, { useState } from 'react';

import './main.css';


function Todo({ todo, index, removeTodo, toggleStatus }) {
  let classes = `todo ${todo.status === 'completed' ? 'completed' : ''}`;
  return (
    <div className={classes} style={{ display: 'flex' }}>
      <li className="todo-item">
        {todo.description}
      </li>

      <button className="check-btn" onClick={() => toggleStatus(index)}>
        <i className="fa fa-check"></i>
      </button>
      <button className="trash-btn" onClick={() => removeTodo(index)}>
        <i className="fa fa-trash"></i>
      </button>
    </div>
  );
}

function TodoForm({ addTodo, onFilterToDo }) {
  const [value, setValue] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  const filterToDo = e => {
    let filter = e.target.value;
    onFilterToDo(filter);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" className="todo-input" maxLength="40" value={value} onChange={e => setValue(e.target.value)} />
      <button type="submit" className="todo-button">
        <i className="fa fa-plus-square"></i>
      </button>

      <div className="select" onChange={filterToDo}>
        <select name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>

  );
}

function App() {
  let data = JSON.parse(localStorage.getItem("todos"));
  let arrayItem = data ? data : [];
  const [todos, setTodos] = useState(arrayItem);

  let getNextId = (todos) => {
    if (todos.length === 0) {
      return 1;
    }
    let ids = todos.map(todo => todo.id);
    return Math.max(...ids) + 1;
  }

  const addTodo = description => {
    let newTodo = {
      id: getNextId(todos),
      description: description,
      status: 'uncompleted'
    }
    const list = [...todos, newTodo]
    localStorage.setItem('todos', JSON.stringify(list));
    setTodos(list);
  };

  const onFilterToDo = filterToDo => {     
    if (filterToDo != 'all') {
      arrayItem = arrayItem.filter(i=>i.status===filterToDo)     
    }    
    setTodos(arrayItem);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const toggleStatus = index => {
    const newTodos = [...todos];
    newTodos[index].status = todos[index].status === 'completed' ? 'uncompleted' : 'completed';
    localStorage.setItem('todos', JSON.stringify(todos));
    setTodos(newTodos);
  }

  return (
    <div>
      <header>
        <h1>Todo App</h1>
      </header>
      <TodoForm addTodo={addTodo} onFilterToDo={onFilterToDo} />
      <div className="todo-container">
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <Todo
              key={index}
              index={index}
              todo={todo}
              removeTodo={removeTodo}
              toggleStatus={toggleStatus}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
