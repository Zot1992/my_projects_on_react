import TaskCard from "../TaskCard/TaskCard";

const TaskList = ({ tasks = [], onEdit, onDelete, onStatusChange }) => {

    return (
        <div>
            {tasks.length === 0 && (
                <h2 className="text-3xl">Задачи не найдены</h2>
            )}

            {tasks.length !== 0 && (
                <div className="">
                    <h2 className="mb-5 text-3xl">Список задач ({tasks.length})</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map(task => (
                            <div key={task.id} className=''>
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    onStatusChange={onStatusChange}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default TaskList