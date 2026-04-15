import { useState } from 'react';
import './App.css';



function App() {

  const [todoText, setToDoText] = useState("");
  const [todos, setToDos] = useState([{id: 1, name: "eggstest", completed: false}, {id: 2, name: "meattest", completed:true}]);
  const [nextId, setNextId] = useState(3);


  const addToDo = (newToDo) => {
    setToDos(prev => [...prev, {id: nextId, name: newToDo, completed:false}]);
    setNextId(prev => prev + 1);  
    console.log("todo added:", newToDo);
    console.log("todos list:", todos);
    console.log("current nextid:", nextId);
    setToDoText('');
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addToDo(e.target.value);
    }
  }

  const toggleToDo = (currTodo) => {
    setToDos(prev => 
      prev.map(todo => 
        todo.id === currTodo.id
          ? {...todo, completed: !todo.completed}
          : todo 
      )
    )
  }

  const deleteToDo = (currTodo) => {
    setToDos(prev => 
      prev.filter(todo => todo.id !== currTodo.id)
    )
  };


  /*
         <span style ={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? 'gray' : 'black'
              }}>
  */
  return (
    <>
      <header className='app-header'>
        Kayrub Todos
      </header>

      <main className='app-container'>
        <div className='input-row'>
          <input
            className='todo-input'
            id = "text-input"
            type = "text"
            value = {todoText}
            onChange = {(e) => setToDoText(e.target.value)}
            placeholder = "Please type here..."
            onKeyDown = {handleKeyDown}
            />
          <button 
            className='add-btn'
            onClick = {() => addToDo(todoText)}>
            Update List
          </button>
        </div>

        <ul className='todo-list'>
          {todos.map(todo => (
          <li
            className='todo-row'
            key={todo.id}>
            <input 
              className='checkbox'
              type="checkbox"
              checked = {todo.completed}
              onChange = {() => toggleToDo(todo)}
            />

            <span className = {`todo-item ${todo.completed ? 'completed' : ''}`}>
              {todo.name}
            </span>

            <button 
              className='del-btn'
              onClick ={() => deleteToDo(todo)}>
              delete
            </button>
          </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default App
