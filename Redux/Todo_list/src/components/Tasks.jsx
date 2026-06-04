import { useSelector } from "react-redux"
import Task from "./Task"

export default function Tasks({ }) {

    const tasks = useSelector(state => state.tasks.arrayTasks);

    return (
        <main className="container col">
            <h2>Задачи</h2>
            <div className="col">
                {Array.isArray(tasks) && tasks.length === 0 ? <p style={{ fontSize: '22px', fontWeight: 'bold' }}>Нет задач</p>
                    : (
                        <div>
                            {tasks.map(task => (
                                <Task key={task.id} task={task} />
                            ))}
                        </div>
                    )}
            </div>
        </main>
    )
}