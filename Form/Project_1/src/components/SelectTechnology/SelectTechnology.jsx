import Select from 'react-select'
import './select-technology.css'

export default function SelectTechnology({ value, onChange }) {

    const options = [
        { label: 'Pyton', value: 'pyton' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'PHP', value: 'php' },
    ]


    return (
        <Select
            options={options}
            isMulti
            value={value}
            onChange={onChange}
            placeholder='Выберите технологию'
            className='select-technology'
            classNamePrefix='technology'
        />
    )
}