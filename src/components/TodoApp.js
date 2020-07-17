import TodoForm from './TodoForm';
import Todo from './Todo';
import React, { useState } from 'react';

function TodoApp() {
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
            arrayItem = arrayItem.filter(i => i.status === filterToDo)
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

export default TodoApp;