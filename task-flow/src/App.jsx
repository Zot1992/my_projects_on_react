import { useState, useEffect } from 'react'
import './App.css'
import TaskStats from './components/TaskStats/TaskStats';
import TaskFilters from './components/TaskFilters/TaskFilters';
import TaskList from './components/TaskList/TaskList';
import TaskForm from './components/TaskForm/TaskForm';

function App() {

  const [tasks, setTasks] = useState([]); //Хранит все задачи
  const [filters, setFilters] = useState({ status: 'all', employeeId: null }); //Хранит состояние фильтров
  const [editingTask, setEditingTask] = useState(null); //Хранит состояние редактируемой задачи

  useEffect(() => {
    try {
      const saved = localStorage.getItem('taskFlowTasks');
      if (saved) {
        setTasks(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
  }, []); //Загружает данные из localStorage

  useEffect(() => {
    try {
      localStorage.setItem('taskFlowTasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  }, [tasks]); //Загружает данные в localStorage

  const handleSubmitTask = (formData) => {
    if (editingTask) {
      // Редактирование
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === editingTask.id
            ? { ...task, ...formData, updatedAt: new Date().toISOString() }
            : task
        )
      );
      setEditingTask(null);
    } else {
      //  Добавление новой задачи
      const newTask = {
        id: Date.now(),
        ...formData,
        status: 'new',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setTasks(prev => [...prev, newTask]);
    }
  };

  const handleEditTask = (task) => { //Режим редактирования
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => { //Отмена редактирования
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => { //Удаление задачи
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));

    // Если удаляем редактируемую задачу - закрываем форму редактирования
    if (editingTask && editingTask.id === taskId) {
      setEditingTask(null);
    }
  };

  const handleStatusChange = (taskId, newStatus) => { //Смена статуса
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const getFilteredTasks = () => { //Фильтр
    let filtered = tasks;

    //По статусу
    if (filters.status !== 'all') {
      filtered = filtered.filter(task => task.status === filters.status);
    }

    //По исполнителю 
    if (filters.employeeId !== null) {
      filtered = filtered.filter(task => task.employeeId === filters.employeeId);
    }

    return filtered;
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            TaskFlow - Трекер Задач
          </h1>
          <p className="text-gray-600">Управление задачами для вашей команды</p>
        </header>

        <TaskStats tasks={tasks} />


        <TaskForm
          editingTask={editingTask}
          onSubmit={handleSubmitTask}
          onCancel={handleCancelEdit}
        />

        <TaskFilters filters={filters} onFiltersChange={setFilters} />

        <TaskList
          tasks={filteredTasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  )
}

export default App
