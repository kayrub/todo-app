import { useEffect, useState } from 'react';
import './App.css';
import WeatherWidget from './WeatherWidget';
import TodoApp from './TodoApp';


/*
pull weather widget in its own component
pull todo list in its own component
*/

function App() {

  const [todoText, setTodoText] = useState(""); 
  const [todos, setTodos] = useState([]);
  const [nextId, setNextId] = useState(3);
  const [filterTodos, setFilterTodos] = useState('all');
  const [isHydrated, setisHydrated] = useState(false);


  useEffect(() => {
    const storedToDosData = localStorage.getItem('todos');
    const storedNextId = localStorage.getItem('nextId');
    // console.log('useEffect storedData: ',storedToDosData);
    if (storedToDosData) {
      setTodos(JSON.parse(storedToDosData));
      setNextId(JSON.parse(storedNextId));
      // console.log(todos) 
    }
    setisHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('nextId', JSON.stringify(nextId));
    // console.log('saving to local Storage')
    // console.log(localStorage);
  }, [todos, isHydrated, nextId]);


  const addTodo = (newTodo) => {
    setTodos(prev => [...prev, {id: nextId, name: newTodo, completed:false}]);
    setNextId(prev => prev + 1);  
    // console.log("todo added:", newTodo);
    // console.log("todos: ", todos);
    // console.log("current nextid:", nextId);
    setTodoText('');
    
  }


  const toggleTodo = (currTodo) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === currTodo.id
          ? {...todo, completed: !todo.completed}
          : todo 
      )
    )
  }

  // const countTodos = todos.filter(todo => !todo.completed).length;
  // const countRemaining = (curr) => curr !== 1 ? 'items' : 'item';


  const deleteTodo = (currTodo) => {
    setTodos(prev => 
      prev.filter(todo => todo.id !== currTodo.id)
    )
  };

  return (
    <>
      <header className='app-header'>
        Kayrub Todos
      </header>

      <main className='app-container'>
        <WeatherWidget/>
        <TodoApp
          todoText = {todoText}
          todos = {todos}
          setTodoText = {setTodoText}
          filter = {filterTodos}
          onAddTodo={addTodo}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onChangeFilter={setFilterTodos}

        />
        {/* <div className='input-row'>
          <input
            className='todo-input'
            id = "text-input"
            type = "text"
            value = {todoText}
            onChange = {(e) => setTodoText(e.target.value)}
            placeholder = "Please type here..."
            onKeyDown = {handleKeyDown}
            />
          <button 
            className='add-btn'
            onClick = {() => addTodo(todoText)}>
            Add Todo
          </button>
          <select 
            className='filter-selector'
            onChange = {(e) => setFilterTodos(e.target.value)}>
            <option value='all'>All</option>
            <option value='completed'>Completed</option>
            <option value='active'>Active</option>
          </select>
        </div>

        <div className='counter-row'>{countTodos} {countRemaining(countTodos)} remaining</div>

        <ul className='todo-list'>
          {filterViewTodos.map(todo => (
          <li
            className='todo-row'
            key={todo.id}>
            <input 
              className='checkbox'
              type="checkbox"
              checked = {todo.completed}
              onChange = {() => toggleTodo(todo)}
            />

            <span className = {`todo-item ${todo.completed ? 'completed' : ''}`}>
              {todo.name}
            </span>

            <button 
              className='del-btn'
              onClick ={() => deleteTodo(todo)}>
              Delete
            </button>
          </li>
          ))}
        </ul> */}
        {/* <button onClick = {() => breakWeather()}>breakWeather</button> */}
      </main>
    </>
  )
}

export default App
