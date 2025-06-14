import './App.css';
// import Task from './Task/Task.jsx'
// import React, { useState } from 'react';
// import Counter from './Counter.jsx'
// import TextInput from './TextInput'
// import ListManager from './ListManager/ListManager'
import TodoList from './TodoList/TodoList.jsx'

function App() {

  // const [tasks, setTasks] = useState([
  //   { text: 'Купить продукты', isCompleted: true },
  //   { text: 'Изучить React', isCompleted: false },
  //   { text: 'Сделать проект', isCompleted: true },
  // ]);


  // const handleComplete = (index, newStatus) =>
  //   setTasks(prevTasks =>
  //     prevTasks.map((task, i) =>
  //       (i === index) ? { ...task, isCompleted: newStatus } : task
  //     )
  //   )

  // return (
  //   <div className='container'>
  //     <h1>Мои задачи</h1>
  //     <ul>
  //       {
  //         tasks.map((el, index) => (
  //           <Task
  //             key={index}
  //             text={el.text}
  //             isCompleted={el.isCompleted}
  //             onComplete={(status) => handleComplete(index, status)}
  //           />
  //         ))
  //       }
  //     </ul>
  //   </div>
  // );

  return (
    <div>
      <TodoList />
    </div>
  )
}

export default App;




