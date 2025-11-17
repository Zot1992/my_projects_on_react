import { taskStatuses } from '../../data/employees'

const TaskStats = ({ tasks = [] }) => {

    const countStats = { //Счет задач с опеределенным статусом
        total: tasks.length,
        new: tasks.filter(task => task.status === taskStatuses.NEW).length,
        in_progress: tasks.filter(task => task.status === taskStatuses.IN_PROGRESS).length,
        completed: tasks.filter(task => task.status === taskStatuses.COMPLETED).length
    }

    return (
        <div>
            <h2 className='text-3xl text-gray-500'>Статистика</h2>
            <div className='hidden md:block'>
                <div className='mt-5 mb-5 flex flex-col'>
                    <p className='text-blue-400'>Всего задач: {countStats.total}</p>
                    <p className='text-purple-400'>Новые: {countStats.new}</p>
                    <p className='text-orange-400'>В работе: {countStats.in_progress}</p>
                    <p className='text-green-400'>Выполнено: {countStats.completed}</p>
                </div>
            </div>
            <div className='block md:hidden'>
                <div className='mt-5 mb-5 flex flex-col justify-center'>
                    <div className='flex flex-row justify-evenly'>
                        <p className='text-blue-400'>Всего задач: {countStats.total}</p>
                        <p className='text-purple-400'>Новые: {countStats.new}</p>
                    </div>
                    <div className='flex flex-row justify-evenly'>
                        <p className='text-orange-400'>В работе: {countStats.in_progress}</p>
                        <p className='text-green-400'>Выполнено: {countStats.completed}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskStats