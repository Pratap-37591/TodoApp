import { useEffect, useState } from "react";


const Todo = () => {
    const [todos, setTodos] = useState(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]')
        return storedTodos;
    });
    const [newTodo, setNewTodo] = useState('');


    useEffect(() => {
        // Save todos to local storage whenever todos change
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleInputChange = (e) => {
        setNewTodo(e.target.value)
    }

    const handleAddTodo = () => {

        if (newTodo.trim() === '') return;
        setTodos([...todos, { text: newTodo, completed: false }]);
        setNewTodo('');
    }
    const handleCompleteTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setTodos(updatedTodos);
    }

    const handleRemoveTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
    }

    return (
        <>
            <center><h1 className="todoHeading">Simple Todo App📝</h1></center>
            <div className="todoInput">
                <input type="text" value={newTodo} onChange={handleInputChange} placeholder="Write your thoughts" />
                <button className="todoAddButton" onClick={handleAddTodo}>
                    Add
                </button>
            </div>

            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} onClick={() => handleCompleteTodo(index)}>{todo.text}</span>
                        <button onClick={() => handleRemoveTodo(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Todo;