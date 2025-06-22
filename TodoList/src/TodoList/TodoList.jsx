import '../TodoList/TodoList.css'
import React, { useState, useEffect } from 'react'
import TextEdit from '../TodoList/TextEdit.jsx'

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
    },
    ])

    const [editTaskId, setEditTaskId] = useState(null); //Хранит id задачи
    const [editText, setEditText] = useState(''); //Хранит введеный текст в input
    const [filter, setFilter] = useState('all'); //Хранит выбранные параметры для поиска определенных задач по параметрам

    const newId = () => {  //Ищет максимальный id 
        let maxId = 0;
        tasks.forEach(task => { if (maxId < task.id) maxId = task.id })
        return maxId + 1
    }

    const [nextID, setNextID] = useState(newId); //Хранит следующий id задачи
    const newAtTask = () => {  //Добавляет новую задачу
        const trimedValue = editText.trim();

        if (trimedValue) {
            const newTask =
            {
                id: nextID,
                text: trimedValue,
                completed: false
            }
            setNextID(prev => prev + 1);
            setTasks(prevTasks => [...prevTasks, newTask]);
            setEditText('');
        }
        else alert('Вы не ввели текст задачи! Что бы ее добавить введите текст и затем нажмите (Добавить задачу).')
    }

    const startEdit = (taskId, currentText) => { return setEditTaskId(taskId), setEditText(currentText) } //Заходим в редактирование текста задачи

    const saveEdit = (taskId, newText) => { //Сохраняет измененный текст и выходит из редактирования
        const tremmed = newText.trim();
        if (tremmed && taskId !== null) {
            setTasks(prev => {
                return prev.map(task => task.id === taskId ? { ...task, text: tremmed } : task)
            })
        }
        cancelEdit();
    }

    const cancelEdit = () => { return setEditTaskId(null), setEditText('') } //Выходим из редактирования текста задачи

    useEffect(() => {
        console.log(tasks)
    }, [tasks]); //Срабатывает когда tasks меняется


    const filteredTaks = tasks.filter((task) => {   // Работа с фильтром
        if (filter === 'activ') {
            return !task.completed
        }

        if (filter === 'complited') {
            return task.completed
        }

        return true
    })

    const removeTask = (taskId) => setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))  //Удаление задачи
    const completeTask = (taskId) => setTasks(prevTasks => prevTasks.map(task => (task.id === taskId) ? ({ ...task, completed: !task.completed }) : task)) // Меняем статус задачи
    const deleteComplitedTasks = () => setTasks(tasks => tasks.filter(task => task.completed !== true))//Удаление выполненных задач

    const stat = {
        total: tasks.length,
        activ: tasks.filter((task) => !task.completed).length,
        completed: tasks.filter((task) => task.completed).length
    }

    return (
        <div className='container'>
            <h1>Список дел</h1>
            <div className='task-app'>
                <input className='input' type="text" placeholder='Введите задачу' value={editText} onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && newAtTask()} />
                <button className='btn' onClick={newAtTask}>Добавить задачу</button>
                <button className='btn' onClick={() => console.log(tasks)}>Показать массив</button>
            </div>

            <div className='container-tasks' id='container-tasks'>
                <ul>{filteredTaks.map(task => (
                    <li className={`task ${task.completed ? 'completed' : ''}`} key={task.id}>
                        <span onDoubleClick={() => startEdit(task.id, task.text)}>{task.text}</span>
                        <input type="checkbox" checked={task.completed} onChange={() => completeTask(task.id)} />
                        <button onClick={() => removeTask(task.id)}>Удалить</button>
                        {editTaskId === task.id && ( // Показываем TodoItem только для текущего элемента
                            <TextEdit
                                task={task}
                                onUpdate={saveEdit}
                            />
                        )}
                    </li>
                ))}
                </ul>
            </div>
            <button onClick={deleteComplitedTasks}>Удалить выполненные задачи</button>
            <div className='container-statistics'>
                <h3>Статистика</h3>
                <p>Активных задач:{stat.activ}</p>
                <p>Выполненных задач:{stat.completed}</p>
                <p>Общее колличесво задач: {stat.total}</p>
            </div>
            <div>
                <button onClick={() => setFilter('all')}>Все</button>
                <button onClick={() => setFilter('activ')}>Активные</button>
                <button onClick={() => setFilter('complited')}>Выполненные</button>
            </div>
        </div>
    )
}

export default TodoList
