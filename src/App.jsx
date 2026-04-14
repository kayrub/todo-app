import { useState } from 'react'

/* Day 3 (25 min): Add a delete button next to each todo. Add a checkbox to mark todos as done (strikethrough text). Commit and push. 

first change data set to be array of objects. in case duplicate list items.
2nd map array of objects only display name
3rd create delete handler using filter
4th add delete button
5th research strikethrough
  input type =checkbox
  create handler to check 
  onChange boolean to check
  css span style textDecoration, color
15 minutes to research
Blockers
1st how to handle unique id, having an id counter
25 min to change todos data to array of obj and to display


*/

function App() {

  const [todoText, setToDoText] = useState("");
  const [todos, setToDos] = useState([{id: 1, name: "eggstest",}, {id: 2, name: "meattest"}]);
  const [nextId, setNextId] = useState(3);


  const updateToDo = (newToDo) => {
    setToDos(prev => [...prev, {id: nextId, name: newToDo}]);
    setNextId(prev => prev + 1);  
    console.log("todo added:", newToDo);
    console.log("todos list:", todos);
    console.log("current nextid:", nextId);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      updateToDo(e.target.value);
    }
  }

  return (
    <>
      <header>
        TEST HEADER
      </header>
      <section>
        kayrub todos
      </section>
      <div>
        <input
          id = "text-input"
          type = "text"
          value = {todoText}
          onChange = {(e) => setToDoText(e.target.value)}
          placeholder = "Please type here..."
          onKeyDown = {handleKeyDown}
          />
        <button onClick = {() => updateToDo(todoText)}>
          Update List
        </button>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>{todo.name}</li>
          ))}
        </ul>
      </div>
  
    </>
  )
}

export default App
