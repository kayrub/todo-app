//   todos = {todos}
//           filter = {filterTodos}
//           onprops.onAddTodo={props.onAddTodo}
//           onToggleTodo={toggleTodo}
//           onDeleteTodo={deleteTodo}
//           onChangeFilter={setFilterTodos}

const TodoApp = (props) => {

const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      props.onAddTodo(e.target.value);
    }
  }

   const filterViewTodos = props.todos.filter(todo => {
    if(props.filter === 'completed') return todo.completed;
    if(props.filter === 'active') return !todo.completed;
    return true;
  })

  const countTodos = props.todos.filter(todo => !todo.completed).length;
  const countRemaining = (curr) => curr !== 1 ? 'items' : 'item';


    return(
        <div>
          <div className='input-row'>
          <input
            className='todo-input'
            id = "text-input"
            type = "text"
            value = {props.todoText}
            onChange = {(e) => props.setTodoText(e.target.value)}
            placeholder = "Please type here..."
            onKeyDown = {handleKeyDown}
            />
          <button 
            className='add-btn'
            onClick = {() => props.onAddTodo(todoText)}>
            Add Todo
          </button>
          <select 
            className='filter-selector'
            onChange = {(e) => props.onChangeFilter(e.target.value)}>
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
              onChange = {() => props.onToggleTodo(todo)}
            />

            <span className = {`todo-item ${todo.completed ? 'completed' : ''}`}>
              {todo.name}
            </span>

            <button 
              className='del-btn'
              onClick ={() => props.onDeleteTodo(todo)}>
              Delete
            </button>
          </li>
          ))}
        </ul>
        </div>
    )
}

export default TodoApp;