import Select from 'react-select'
import './Selector-City.css'

export default function SelectorCity({ value, onChange, styles }) {

    const options = [
        { label: 'Москва', value: 'moscow' },
        { label: 'Санкт-Петербург', value: 'saint-petersburg' },
        { label: 'Новосибирск', value: 'novosibirsk' },
        { label: 'Сочи', value: 'sochi' },
        { label: 'Краснодар', value: 'krasnodar' },
        { label: 'Иркутск', value: 'irkutsk' },
    ]

    return (
        <Select
            options={options}
            value={value}
            onChange={onChange}
            styles={styles}
            placeholder='Город'
            className='select-city'
            classNamePrefix='city'
        />
    )

}