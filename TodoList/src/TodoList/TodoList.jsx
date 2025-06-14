import '../TodoList/TodoList.css'
import React, { useState, useEffect } from 'react'
import TextEdit from '../TodoList/TextEdit.jsx';

function TodoList() {

    const [tasks, setTasks] = useState([{  //Хранит задачи
        id: 0,
        text: 'Изучить React',
        completed: false
    },
    {
        id: 1,
        text: 'Сделать задачу',
        completed: true
    }])
    const [inputValue, setInputValue] = useState(''); //Хранит значение из input
    const [completedTasks, setCompletedTasks] = useState(0); //Хранит колличесво выполненных задач
    const [activeTasks, setActiveTasks] = useState(0); //Хранит колличесво активных задач
    const [editingTaskId, setEditingTaskId] = useState(null); // Храним id редактируемой задачи

    useEffect(() => {
        const completed = tasks.filter(task => task.completed).length;
        const active = tasks.filter(task => !task.completed).length;
        setCompletedTasks(completed);
        setActiveTasks(active);
    }, [tasks]); //Срабатывает когда tasks меняется

    const addTask = () => { //Добавление задачи
        const trimedValue = inputValue.trim();

        if (trimedValue) {
            const newTask = {
                id: tasks.length,
                text: trimedValue,
                completed: false
            }
            setTasks(prevTasks => [...prevTasks, newTask]);
            setInputValue('');
        }
        else {
            alert('Вы не ввели текст задачи! Что бы ее добавить введите текст и затем нажмите (Добавить задачу).');
        }
    }

    const removeTask = (taskId) => setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))  //Удаление задачи
    const completeTask = (taskId) => setTasks(prevTasks => prevTasks.map(task => (task.id === taskId) ? ({ ...task, completed: !task.completed }) : task)) // Меняем статус задачи
    const deleteComplitedTasks = () => setTasks(tasks => tasks.filter(task => task.completed !== true))//Удаление выполненных задач
    const switchToEditMode = (taskId) => setEditingTaskId(taskId) //Редактирование появляется под выбранной задачей
    const exitEditMode = () => setEditingTaskId(null); //Выход из редактирования

    return (
        <div className='container'>
            <h1>Список дел</h1>
            <div className='task-app'>
                <input className='input' type="text" placeholder='Введите задачу' value={inputValue} onChange={(event) => setInputValue(event.target.value)}
                    onKeyPress={(event) => event.key === 'Enter' && addTask()} />
                <button className='btn' onClick={addTask}>Добавить задачу</button>
                <button className='btn' onClick={() => console.log(tasks)}>Показать массив</button>
            </div>

            <div className='container-tasks' id='container-tasks'>
                <ul>{tasks.map(task => (
                    <li className={`task ${task.completed ? 'completed' : ''}`} key={task.id}>
                        <span>{task.text}</span>
                        <input type="checkbox" checked={task.completed} onChange={() => completeTask(task.id)} />
                        <button onClick={() => switchToEditMode(task.id)}>Редактировать</button>
                        <button onClick={() => removeTask(task.id)}>Удалить</button>
                        {editingTaskId === task.id && ( // Показываем TextEdit только для текущего элемента
                            <TextEdit
                                onClose={exitEditMode}
                                taskId={task.id}
                                taskText={task.text}
                                setTasks={setTasks}
                            />)}
                    </li>
                ))}
                </ul>
            </div>
            <button onClick={deleteComplitedTasks}>Удалить выполненные задачи</button>
            <div className='container-statistics'>
                <h3>Статистика</h3>
                <p>Активных задач:{activeTasks}</p>
                <p>Выполненных задач:{completedTasks}</p>
                <p>Общее колличесво задач: {tasks.length}</p>
            </div>
        </div>
    )
}

export default TodoList
