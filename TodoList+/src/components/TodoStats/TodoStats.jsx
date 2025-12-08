import { useState, useEffect } from 'react'

export const TodoStats = ({ tasks = [], countActive, countCompleted, deleteTasksComplited }) => {

    const [active, setActive] = useState(0);
    const [complited, setComplited] = useState(0);

    useEffect(() => {
        setActive(countActive())
        setComplited(countCompleted())
    }, [tasks, tasks.complited])

    const hasCompletedTasks = () => tasks.some(task => task.completed);

    return (
        <div className='mt-6 p-4 bg-white flex flex-row justify-between shadow-sm rounded-md gap-2'>
            <div className='flex flex-row gap-2'>
                <p>Всего: <span className='font-bold text-2xl'>{tasks.length}</span></p>
                <p>Активных: <span className='font-bold text-2xl'>{active}</span></p>
                <p>Выполненных: <span className='font-bold text-2xl'>{complited}</span></p>
            </div>

            {hasCompletedTasks() && (<button className='text-white bg-red-500 rounded-md p-2 font-bold cursor-pointer transition-all duration-300 hover:bg-red-400'
                onClick={() => deleteTasksComplited()}>Очистить выполненные</button>)}
        </div>
    )
}