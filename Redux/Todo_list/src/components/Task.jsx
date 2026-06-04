import { useDispatch } from "react-redux";
import { openUpdate, deleteTask } from "../redux/slices/tasksSlice";

export default function Task({ task }) {

    const dispatch = useDispatch();

    const handleOpen = () => dispatch(openUpdate(task.id));
    const handleDelete = () => {
        if (!confirm('Вы уверены что хотите удалить данную задачу?')) return
        dispatch(deleteTask(task.id));
    }

    return (
        <div className="task">
            <h3>{task.name}</h3>
            <div className="row">
                <button onClick={handleOpen}>Изменить</button>
                <button onClick={handleDelete}>Удалить</button>
            </div>
        </div>
    )
}