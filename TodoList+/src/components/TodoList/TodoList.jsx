import { TodoIthem } from "../TodoItem/TodoIthem";

export const TodoList = ({ tasks = [], changeTodos, deleteTask }) => {

    return (
        <div>
            {tasks.length === 0 && <h1>Задачи не найдены</h1>}

            {tasks.length > 0 && (
                <div>
                    <div className="grid grid-cols-1 gap-6">
                        {tasks.map(task => (
                            <div key={task.id} className=''>
                                <TodoIthem
                                    task={task}
                                    changeTodos={changeTodos}
                                    deleteTask={deleteTask}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}