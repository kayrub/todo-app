import { useEffect, useState } from 'react';
import './App.css';
import WeatherWidget from './WeatherWidget';


/*
pull weather widget in its own component
pull todo list in its own component
*/

function App() {

  const [todoText, setToDoText] = useState("");
  const [todos, setToDos] = useState([]);
  const [nextId, setNextId] = useState(3);
  const [filterToDos, setFilterToDos] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);
  const [weather, setWeather] = useState(false);
  const [isLoadingWeather, setIsLoadingWeather] = useState("loading");
  const [weatherUrl, setWeatherUrl] = useState('https://wttr.in/?format=j1');
  

useEffect(() => {
  setTimeout(() => {
  const fetchWeather = async () => {
    try {
      const res = await fetch(weatherUrl);
      const data = await res.json();
      // console.log("weather data: ", data);
      setWeather({
        condition: data.current_condition[0],
        temperature: data.weather[0]
      });
      setIsLoadingWeather("loaded");
    } catch (err) {
      console.log("error beepp boop: ", err);
      setIsLoadingWeather("failed");
    }
  };
  fetchWeather();
  }, 2000)
}, [weatherUrl]);

  useEffect(() => {
    const storedToDosData = localStorage.getItem('todos');
    const storedNextId = localStorage.getItem('nextId');
    // console.log('useEffect storedData: ',storedToDosData);
    if (storedToDosData) {
      setToDos(JSON.parse(storedToDosData));
      setNextId(JSON.parse(storedNextId));
      // console.log(todos) 
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('nextId', JSON.stringify(nextId));
    // console.log('saving to local Storage')
    // console.log(localStorage);
  }, [todos, isLoaded, nextId]);

  const breakWeather = () => {
    setWeatherUrl('https://beepboopsuckstosuck/');
    setIsLoadingWeather('failed');
    console.log(isLoadingWeather);
  }

  const addToDo = (newToDo) => {
    setToDos(prev => [...prev, {id: nextId, name: newToDo, completed:false}]);
    setNextId(prev => prev + 1);  
    // console.log("todo added:", newToDo);
    // console.log("todos: ", todos);
    // console.log("current nextid:", nextId);
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
        <WeatherWidget loading={isLoadingWeather} url={weatherUrl} weather={weather}/>
        {/* {isLoadingWeather === "failed" && <div> failed to connect to {weatherUrl} </div>}
        {isLoadingWeather === "loading" && <div>Weather is Loading...setTimeOut to replicate</div>}
        {isLoadingWeather === "loaded" && <div className='weather-row'>Temperature: {weather.condition.temp_F}F   Condition: {weather.condition.weatherDesc[0].value}</div>} */}
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
        <button onClick = {() => breakWeather()}>breakWeather</button>
      </main>
    </>
  )
}

export default App
