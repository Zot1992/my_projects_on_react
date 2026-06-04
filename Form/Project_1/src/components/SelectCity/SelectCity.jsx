import Select from 'react-select'
import './select-city.css'

export default function SelectCity({ value, onChange }) {

    const options = [
        { label: 'Москва', value: 'moscow' },
        { label: 'Санкт-Петербург', value: 'saint_petersburg' },
        { label: 'Сочи', value: 'sochi' },
        { label: 'Новосибирск', value: 'novosibirsk' },
    ]

    return (
        <Select
            options={options}
            value={value}
            onChange={onChange}
            placeholder='Выберите город'
            className='select-city'
            classNamePrefix='city'
        />
    )
}