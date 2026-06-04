import { useState } from "react"
import { closeUpdate, updateTask } from "../redux/slices/tasksSlice";
import { useDispatch, useSelector } from "react-redux";


export default function Form_update({ }) {

    const dispatch = useDispatch();

    const taskUpdate = useSelector(state => state.tasks.taskUpdate);

    const [inpValue, setInpValue] = useState(taskUpdate.name);

    const handleSave = () => dispatch(updateTask({ id: taskUpdate.id, name: inpValue }));
    const handleClose = () => dispatch(closeUpdate());

    return (
        <form className="container col" action="">
            <h2>Изменить задачу</h2>
            <div className="row">
                <input type="text" value={inpValue} onChange={e => setInpValue(e.target.value)} />
                <button type="button" onClick={handleSave}>Сохранить</button>
                <button type="button" onClick={handleClose}>Отменить</button>
            </div>
        </form>
    )
}