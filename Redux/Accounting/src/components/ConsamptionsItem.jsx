import { useDispatch } from 'react-redux'
import { deleteItem } from '../redux/slices/consumptionSlice';

export default function ConsamptionsItem({ con }) {

    const dispatch = useDispatch();

    const handleClick = () => {
        if (!confirm('Вы действительно хотите удалить этот расход?')) return;

        dispatch(deleteItem(con.id))
    }

    return (
        <div className='array-Item'>
            <p>{con.name}</p>
            <p>{con.price} ₽</p>
            <button onClick={handleClick}>Удалить</button>
        </div>
    )
}