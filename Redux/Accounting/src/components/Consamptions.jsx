import { useDispatch, useSelector } from 'react-redux'
import ConsamptionsItem from "./ConsamptionsItem"
import { addItem } from '../redux/slices/consumptionSlice'
import { useState } from 'react';

export default function Consamptions({ }) {

    const dispatch = useDispatch();

    const consumption = useSelector(state => state.consumption.arrayConsumption);

    const [inpName, setInpName] = useState('');
    const [inpPrice, setInpPrice] = useState('');

    const handleClick = () => {
        dispatch(addItem({ name: inpName, price: inpPrice }))
    }

    return (
        <div className="accounting__container-item col">
            <div className='row'>
                <input type="text" value={inpName} onChange={e => setInpName(e.target.value)} placeholder='Название' />
                <input type="number" value={inpPrice} onChange={e => setInpPrice(e.target.value)} placeholder='Сумма' />
                <button onClick={handleClick}>Добавить</button>
            </div>

            <h2>Расходы</h2>

            <div className='col'>
                {Array.isArray(consumption) && consumption.length === 0 ? <p>Нет расходов</p> :
                    (<div>
                        {consumption.map(con => (
                            <ConsamptionsItem key={con.id} con={con} />
                        ))}
                    </div>)}
            </div>

        </div>
    )
}