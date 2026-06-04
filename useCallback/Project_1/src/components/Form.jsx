import { useCallback, useContext, useState } from "react"
import { ContextList } from "../context/ContextList";


export default function Form({ }) {

    const { list, setList } = useContext(ContextList);

    const [value, setValue] = useState('');
    const [value_2, setValue_2] = useState('');

    const handleClik = useCallback(() => {

        const trimmedValue = value.trim();
        const trimmedValue2 = value_2.trim();

        if (!trimmedValue || !trimmedValue2) {
            alert('Пожалуйста, заполните оба поля');
            return;
        }

        const num1 = Number(trimmedValue);
        const num2 = Number(trimmedValue2);

        if (isNaN(num1) || isNaN(num2)) {
            alert('Введите корректные числа');
            return;
        }

        const result = num1 + num2;

        const newItem = {
            id: Date.now(),
            number_1: num1,
            number_2: num2,
            result: result
        };

        setList([...list, newItem])

        setValue('');
        setValue_2('');
    }, [value, value_2, list, setList])

    return (
        <form action="" className="row">
            <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Введите первое число" />
            <input type="text" value={value_2} onChange={e => setValue_2(e.target.value)} placeholder="Введите второе число" />
            <button type="button" onClick={handleClik}>Расчитать</button>
        </form>
    )
}