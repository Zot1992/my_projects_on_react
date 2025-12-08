import { useState } from 'react'

export const TodoFilters = ({ onFiltredTodos }) => {

    const [openAll, setOpenAll] = useState(true);
    const [openActive, setOpenActive] = useState(false);
    const [openCompleted, setOpenCompleted] = useState(false);

    const visitAll = () => {
        setOpenAll(true)
        setOpenActive(false)
        setOpenCompleted(false)
        onFiltredTodos('all')
    }

    const visitActive = () => {
        setOpenAll(false)
        setOpenActive(true)
        setOpenCompleted(false)
        onFiltredTodos('active')
    }

    const visitCompleted = () => {
        setOpenAll(false)
        setOpenActive(false)
        setOpenCompleted(true)
        onFiltredTodos('completed')
    }

    return (
        <div className='flex justify-between w-full gap-4'>
            <button className={`flex-1 p-2 bg-blue-500 text-amber-50 font-bold rounded-md cursor-pointer transition-all duration-300 hover:bg-blue-400
            ${!openAll && 'bg-gray-400 hover:bg-gray-300'}`}
                onClick={() => visitAll()}>Все</button>
            <button className={`flex-1 p-2 bg-blue-500 text-amber-50 font-bold rounded-md cursor-pointer transition-all duration-300 hover:bg-blue-400
            ${!openActive && 'bg-gray-400 hover:bg-gray-300'}`}
                onClick={() => visitActive()}>Активные</button>
            <button className={`flex-1 p-2 bg-blue-500 text-amber-50 font-bold rounded-md cursor-pointer transition-all duration-300 hover:bg-blue-400
            ${!openCompleted && 'bg-gray-400 hover:bg-gray-300'}`}
                onClick={() => visitCompleted()}>Выполненные</button>
        </div>
    )
}