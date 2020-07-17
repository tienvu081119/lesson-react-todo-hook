import React, { useState } from 'react';

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

 export default TodoForm; 