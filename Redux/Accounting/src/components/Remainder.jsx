import { useDispatch, useSelector } from 'react-redux'
import { calculationSum } from '../redux/slices/remainderSlice'
import { useEffect } from 'react';

export default function Remainder({ }) {

    const dispatch = useDispatch();

    const sumIncome = useSelector(state => state.income.sumPrice);
    const sumConsumption = useSelector(state => state.consumption.sumPrice);
    const remainder = useSelector(state => state.remainder.sumPrice);

    useEffect(() => {
        dispatch(calculationSum({ income: sumIncome, consumption: sumConsumption }))
    }, [sumIncome, sumConsumption, dispatch])

    return (
        <div className='total'>
            <p>Остаток</p>
            <h3>{remainder} ₽</h3>
        </div>
    )
}