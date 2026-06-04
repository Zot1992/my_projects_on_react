import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/slices/tasksSlice";

export default function From({ }) {

    const dispatch = useDispatch();

    const arr = useSelector(state => state.tasks.arrayTasks);

    const [inpValue, setInpValue] = useState('');

    const handleClick = () => {
        dispatch(addTask(inpValue));
        setInpValue('');
    }

    return (
        <form className="container col" action="">
            <h2>Добавить задачу</h2>
            <div className="row">
                <input type="text" value={inpValue} onChange={e => setInpValue(e.target.value)} placeholder="Введите задачу" />
                <button type="button" onClick={handleClick}>Добавить</button>
            </div>
        </form>
    )
}