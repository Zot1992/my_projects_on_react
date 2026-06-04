import { useDispatch, useSelector } from 'react-redux'
import IncomeItem from "./IncomeItem"
import { addItem } from '../redux/slices/incomeSlice'
import { useState } from 'react';

export default function Income({ }) {

    const dispatch = useDispatch();

    const income = useSelector(state => state.income.arrayIncome);

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

            <h2>Доходы</h2>

            <div className='col'>
                {Array.isArray(income) && income.length === 0 ? <p>Нет доходов</p> :
                    (<div>
                        {income.map(inc => (
                            <IncomeItem key={inc.id} inc={inc} />
                        ))}
                    </div>)}
            </div>

        </div>
    )
}