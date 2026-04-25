import { useEffect, useState } from 'react';
import './App.css';
import WeatherWidget from './WeatherWidget';
import TodoApp from './TodoApp';


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

  const addTodoInput = (e) => setTodoText(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
       addTodo(e.target.value);
    }
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
          // setTodoText = {setTodoText}
          filter = {filterTodos}
          onAddTodo={addTodo}
          onAddTodoInput={addTodoInput}
          onHandleKeyDown={handleKeyDown}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onChangeFilter={setFilterTodos}
        />
      </main>
    </>
  )
}

export default App
