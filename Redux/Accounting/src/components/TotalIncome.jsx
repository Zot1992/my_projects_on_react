import { useEffect } from 'react';
import { calculationSum } from '../redux/slices/incomeSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function TotalIncome({ }) {

    const dispatch = useDispatch();

    const arrayIncome = useSelector(state => state.income.arrayIncome);
    const sumIncome = useSelector(state => state.income.sumPrice);

    useEffect(() => {
        dispatch(calculationSum())
    }, [arrayIncome])

    return (
        <div className='total'>
            <p>Всего доходов</p>
            <h3>{sumIncome} ₽</h3>
        </div>
    )
}