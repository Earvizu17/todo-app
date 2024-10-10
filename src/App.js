import "./App.css";
import React, { useState } from "react";
import { connect } from "react-redux";

const App = ({ todos, addTodo, removeTodo, toggleTodo }) => {
    const [input, setInput] = useState("");

    const handleAddTodo = () => {
        if (input.trim()) {
            addTodo({
                id: Date.now(),
                text: input,
                completed: false,
            });
            setInput("");
        }
    };

    const handleRemoveTodo = (id) => removeTodo(id);

    const handleToggleTodo = (id) => toggleTodo(id);

    return (
        <div id="app">
            <h1>To-Do List</h1>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter a task..."
            />
            <button onClick={handleAddTodo}>Add</button>
            <ul>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        style={{
                            textDecoration: todo.completed ? "line-through" : "none",
                            color: todo.completed ? "red" : "black",
                        }}
                        onClick={() => handleToggleTodo(todo.id)}
                    >
                        {todo.text}
                        <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => ({
    todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
    addTodo: (todo) => dispatch({ type: "ADD_TODO", payload: todo }),
    removeTodo: (id) => dispatch({ type: "REMOVE_TODO", payload: id }),
    toggleTodo: (id) => dispatch({ type: "TOGGLE_TODO", payload: id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

