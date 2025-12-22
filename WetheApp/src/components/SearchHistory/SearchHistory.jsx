import { useEffect } from 'react'
import { getSearchHistory, removeFromSearchHistory } from '../../../utils/localStorage';

export const SearchHistory = ({ history = [], onCityClick, changingHistory }) => {

    useEffect(() => {
        changingHistory(getSearchHistory())
    }, [])

    const handleRemove = (city) => {  //Удаление города из списка
        removeFromSearchHistory(city);
        changingHistory(getSearchHistory())
    }

    return (
        <div className='pt-3 pb-4'>
            {history.length > 0 && (
                <div>
                    <h3 className='text-2xl'>Недавние поиски:</h3>
                    <ul className='list-none flex flex-wrap gap-2'>
                        {history.map((city, i) => (
                            <li key={i} className='flex items-center bg-gray-100 px-2 py-1 rounded-lg'>
                                <span className='cursor-pointer text-blue-500 hover:underline' onClick={() => onCityClick(city)}>{city}</span>
                                <button className='ml-1 text-gray-500 hover:text-red-400 border-0 bg-transparent text-sm cursor-pointer'
                                    onClick={() => handleRemove(city)}>x</button>
                            </li>
                        ))}
                    </ul>
                </div>)}
        </div>
    )
}