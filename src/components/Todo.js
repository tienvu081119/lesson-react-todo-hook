import React from 'react';

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
export default Todo;