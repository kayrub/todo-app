import { useEffect, useState } from 'react';
import './App.css';

/*
add a div above input-row
count how many todos are left
iterate over todos, check todos.completed ? counter==1 : do nothing
afterwards everytime toggleToDo is run have it track the count

add a div below input-row
dropdown filter
display all, completed, uncompleted.

localstorage.
store todos JSON.stringify
access todos JSON.parse
useEffect on initial render
useEffect when todos state changes

*/

function App() {

  const [todoText, setToDoText] = useState("");
  const [todos, setToDos] = useState([]);
  const [nextId, setNextId] = useState(3);
  const [filterToDos, setFilterToDos] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedToDosData = localStorage.getItem('todos');
    const storedNextId = localStorage.getItem('nextId');
    console.log('useEffect storedData: ',storedToDosData);
    if (storedToDosData) {
      setToDos(JSON.parse(storedToDosData));
      setNextId(JSON.parse(storedNextId));
      console.log(todos) 
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('nextId', JSON.stringify(nextId));
    console.log('saving to local Storage')
    console.log(localStorage);
  }, [todos, isLoaded, nextId]);

  const addToDo = (newToDo) => {
    setToDos(prev => [...prev, {id: nextId, name: newToDo, completed:false}]);
    setNextId(prev => prev + 1);  
    console.log("todo added:", newToDo);
    console.log("todos: ", todos);
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

  const countToDos = todos.filter(todo => !todo.completed).length;

  const countRemaining = (curr) => curr !== 1 ? 'items' : 'item';

  const filterViewToDos = todos.filter(todo => {
    if(filterToDos === 'completed') return todo.completed;
    if(filterToDos === 'active') return !todo.completed;
    return true;
  })


  const deleteToDo = (currTodo) => {
    setToDos(prev => 
      prev.filter(todo => todo.id !== currTodo.id)
    )
  };

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
            Add Todo
          </button>
          <select 
            className='filter-selector'
            onChange = {(e) => setFilterToDos(e.target.value)}>
            <option value='all'>All</option>
            <option value='completed'>Completed</option>
            <option value='active'>Active</option>
          </select>
        </div>

        <div className='counter-row'>{countToDos} {countRemaining(countToDos)} remaining</div>

        <ul className='todo-list'>
          {filterViewToDos.map(todo => (
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
              Delete
            </button>
          </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default App
