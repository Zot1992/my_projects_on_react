import { useState } from 'react'
// import { Check } from 'lucide/react';

export const TodoIthem = ({ task = [], changeTodos, deleteTask }) => {

    const [edit, setEdit] = useState(false);
    const [newText, setNewText] = useState('');

    const handleOnDelete = (task) => {
        if (confirm("Вы уверены, что хотите удалить эту карточку?")) {
            return deleteTask(task.id)
        }
        return
    }

    const handleOnStatus = (taskId) => (e) => {
        const newCompleted = e.target.checked;

        changeTodos(prev =>
            prev.map(t =>
                t.id === taskId
                    ? { ...t, completed: newCompleted }
                    : t
            )
        )
    }

    const applyEdit = (taskId) => {
        changeTodos(prev =>
            prev.map(t =>
                t.id === taskId
                    ? { ...t, text: newText }
                    : t
            )
        )
    }

    const openEdit = () => {
        setEdit(true);
    }

    const closeEdit = () => {
        setEdit(false);
    }

    return (
        <div className='p-4 bg-white border border-gray-300 rounded-md gap-6 transition-all duration-300 hover:shadow-md hover:bg-gray-100'>
            {!edit ? (<div className='flex flex-row justify-between gap-4'>
                <div className="flex flex-row items-center justify-center gap-4">
                    <input type="checkbox" checked={task.completed} onChange={handleOnStatus(task.id)} />
                    <h1 className={`whitespace-normal break-words max-w-lg ${task.completed && 'line-through text-gray-400'}`}>{task.text}</h1>
                </div>

                <div className="flex flex-row gap-4">
                    <button className='p-2 bg-blue-300 text-amber-50 font-bold rounded-md cursor-pointer transition-all duration-300
             hover:bg-blue-400' onClick={() => openEdit()}>Редактировать</button>
                    <button className='p-2 bg-red-300 text-amber-50 font-bold rounded-md cursor-pointer transition-all duration-300
             hover:bg-red-400' onClick={() => handleOnDelete(task)}>Удалить</button>
                </div>
            </div>
            ) : (<div className='flex flex-row items-center justify-between w-full'>
                <input className='p-2 bg-gray-800 text-gray-300 rounded-md flex-grow  transition-all duration-300 
            focus:outline-none focus:ring-1 focus:ring-blue-500' type="text" value={newText} onChange={e => setNewText(e.target.value)} />
                <div className='ml-4 flex flex-row gap-4'>
                    <button className='p-2 bg-green-300 text-amber-50 font-bold rounded-md cursor-pointer transition-all duration-300
             hover:bg-green-400' onClick={() => (applyEdit(task.id), closeEdit())}>Применить</button>
                    <button className='p-2 bg-red-300 text-amber-50 font-bold rounded-md cursor-pointer transition-all duration-300
             hover:bg-red-400' onClick={() => closeEdit()}>Выйти из редактирования</button>
                </div>
            </div>)}
        </div>
    )
}