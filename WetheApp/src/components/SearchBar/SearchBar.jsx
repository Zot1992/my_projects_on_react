import { useState } from 'react'

export const SearchBar = ({ onSearch, changeErrors }) => {
    const [inputText, setInputText] = useState('');
    const [error, setError] = useState('');

    const valide = () => {
        if (inputText === '') {
            setError('Строка ввода пуста. Пожалуйста введите название города.')
            return false
        }
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        valide() ? (onSearch(inputText.trim()), setError(''))
            : changeErrors(error)

        setInputText('');
    }

    return (
        <form className='flex items-center gap-2.5 mb-5 max-w-600 mx-auto' type='submit' onSubmit={handleSubmit}>
            <input className='flex-1 p-4 px-6 text-base border-2 border-gray-300 
            rounded-lg focus:border-indigo-500'
                type="text" value={inputText} onChange={e => setInputText(e.target.value)} />
            <button className='py-3 px-6  bg-indigo-500  text-white  text-base  font-semibold border-none
             rounded-lg  cursor-pointer  hover:bg-indigo-600 transition-all duration-300' type='submit'>Найти погоду</button>
        </form>
    )
}