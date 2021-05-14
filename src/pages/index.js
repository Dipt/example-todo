import * as React from "react"
import {useState} from "react";
import '../styles.css';

// markup
const IndexPage = () => {
  const [todoList, settodoList] = useState([{
        value: `first todo`,
        isCompleted: false
  }]);
  const [textVal, setTextVal] = useState('');
  const [hideCompleted, sethideCompleted] = useState(false);

  function removeTodo(index) {
      settodoList(todoList => {
          return [...todoList.slice(0,index), ...todoList.slice(index+1)];
      });
  }

  function updateInput(event) {
      // Add to list if key is Enter
      if(event.key === 'Enter' && textVal !== '') {
        settodoList(todoList => [...todoList, {
            isCompleted: false,
            value: event.target.value
        }]);
        setTextVal('');
      } else {
          setTextVal(event.target.value);
      }
  }

  function toggleCompletion(index) {
      let tempTodos = [...todoList];
      let item = {...tempTodos[index]};
      item.isCompleted = (!item.isCompleted);
      tempTodos[index] = item;
      settodoList(tempTodos);
  }

  function populateTodo() {
      return todoList.map((item, index) => {
          return (
              <li className={`todo-item ${hideCompleted && item.isCompleted ? 'hidden' : ''}`} key={index}>
                  <div className="todo-item__text">
                      <input
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={() => toggleCompletion(index)}
                        name={item.value}
                        value={item.value}
                      />
                      <div className={item.isCompleted ? 'muted' : ''}> {item.value} </div>
                  </div>
                  <button onClick={() => removeTodo(index)} className="remove-btn"><span role="img">x</span></button>
              </li>
          )
      });
  }

  return (
    <main>
    <div className="container">
        <div>
            <h1>Todo List</h1>
            <input
                className="input"
                type="text"
                name="input-todo"
                placeholder="Add todo"
                value={textVal}
                onChange={updateInput}
                onKeyPress={updateInput}
                id="todo-input"
            />
            <ul className="todolist">
                {populateTodo()}
            </ul>
            <button onClick={() => sethideCompleted(!hideCompleted)}>{`${hideCompleted ? 'Show' : 'Hide'} Completed`}</button>
        </div>
    </div>
    </main>
  )
}

export default IndexPage