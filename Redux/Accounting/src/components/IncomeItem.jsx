import { useDispatch } from 'react-redux'
import { deleteItem } from '../redux/slices/incomeSlice';

export default function IncomeItem({ inc }) {

    const dispatch = useDispatch();

    const handleClick = () => {
        if (!confirm('Вы действительно хотите удалить этот расход?')) return;

        dispatch(deleteItem(inc.id))
    }

    return (
        <div className='array-Item'>
            <p>{inc.name}</p>
            <p>{inc.price} ₽</p>
            <button onClick={handleClick}>Удалить</button>
        </div>
    )
}