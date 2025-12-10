import { useState, useEffect } from 'react'
import './App.css'
import { TodoInput } from './components/TodoInput/TodoInput'
import { TodoFilters } from './components/TodoFilters/TodoFilters';
import { TodoList } from './components/TodoList/TodoList';
import { TodoStats } from './components/TodoStats/TodoStats';

function App() {

  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  //Загрузка данных из localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('todoList');
      if (saved) {
        setTodos(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
  }, [])

  //Запись данных в localStorage
  useEffect(() => {
    try {
      localStorage.setItem('todoList', JSON.stringify(todos));
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  }, [todos])


  //Добавление новой карточки
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    }

    setTodos([...todos, newTodo])
  }

  //Подсчет активных и выполненых задач
  const countActive = () => todos.filter(task => !task.completed).length;
  const countCompleted = () => todos.filter(task => task.completed).length;

  //Фильтр задач
  const filtredTodos = (selected) => {
    let filtered = todos;

    if (selected === 'all') {
      filtered = todos;
    }

    if (selected === 'active') {
      filtered = filtered.filter(task => !task.completed);
    }

    if (selected === 'completed') {
      filtered = filtered.filter(task => task.completed);
    }

    return filtered;
  }

  //Удаление выбранной задачи
  const deleteTask = (taskId) => {
    const newTodos = todos.filter(task => task.id !== taskId);
    setTodos(newTodos);
  }

  //Удаление выполненных задач
  const deleteTasksComplited = () => {
    const newTodos = todos.filter(task => !task.completed);
    setTodos(newTodos);
  }



  return (
    <div className='min-h-screen bg-gray-100 py-8'>
      <div className='max-w-7xl mx-auto px-4'>
        <header className='text-center mb-6'>
          <h1 className='text-4xl text-blue-500 font-bold'>Todo List</h1>
          <TodoInput
            newTask={addTodo}
          />

          <TodoFilters
            tasks={todos}
            onFiltredTodos={setFilter}
          />
        </header>

        <main className=''>

          <TodoList
            tasks={filtredTodos(filter)}
            deleteTask={deleteTask}
            changeTodos={setTodos}
          />

          <TodoStats
            tasks={todos}
            countActive={countActive}
            countCompleted={countCompleted}
            deleteTasksComplited={deleteTasksComplited}
          />
        </main>

        {console.log(todos)}
      </div>
    </div>
  )
}

export default App
