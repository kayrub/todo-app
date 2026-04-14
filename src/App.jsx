import { useState } from 'react'

function App() {

  const [todoText, setToDoText] = useState("");
  const [todos, setToDos] = useState(["temp1", "temp2", "temp3"]);


  const updateToDo = (newToDo) => {
    setToDos([...todos, newToDo]);
    console.log("todo added:", newToDo);
    console.log("todos list:", todos);
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
          />
        <button onClick = {() => updateToDo(todoText)}>
          Update List
        </button>
        <p>
          {todos}
        </p>
      </div>
  
    </>
  )
}

export default App
