import { useEffect } from 'react';
import { calculationSum } from '../redux/slices/consumptionSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function TotalExpenses({ }) {

    const dispatch = useDispatch();

    const arrayConsumption = useSelector(state => state.consumption.arrayConsumption);
    const sumConsumption = useSelector(state => state.consumption.sumPrice);

    useEffect(() => {
        dispatch(calculationSum())
    }, [arrayConsumption])

    return (
        <div className='total'>
            <p>Всего расходов</p>
            <h3>{sumConsumption} ₽</h3>
        </div>
    )
}