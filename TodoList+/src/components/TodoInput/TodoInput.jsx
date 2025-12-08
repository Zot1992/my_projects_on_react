import { useState } from 'react'

export const TodoInput = ({ newTask }) => {

    const [inputText, setInputText] = useState('');
    const [errors, setErrors] = useState([]);

    const validation = () => {
        if (inputText === '') {
            setErrors('Задача не может быть пустой!')
            return false
        }
        setErrors('')
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validation()) {
            newTask(inputText.trim());
        }

        setInputText('');
    }

    return (
        <form className='mt-4  flex flex-col gap-6' onSubmit={handleSubmit}>
            <input className='p-2 bg-gray-800 text-gray-300 rounded-md  transition-all duration-300 
            focus:outline-none focus:ring-1 focus:ring-blue-500' type="text" value={inputText}
                onChange={e => setInputText(e.target.value)} placeholder='Введите текст задачи' />
            <button className='p-2 bg-blue-500 text-amber-50 font-bold rounded-md cursor-pointer transition-all duration-300
             hover:bg-blue-400' type='submit'>Добавить</button>
            <p className='text-red-500'>{errors}</p>
        </form>
    )
}