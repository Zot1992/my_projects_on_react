import { useState, useEffect, memo } from 'react'

export const SearchBar = memo(function SearchBar({ onSearch }) {

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        let timer = setTimeout(() => {
            onSearch(inputValue);
        }, 300);

        return () => clearTimeout(timer)
    }, [inputValue, onSearch])

    return (
        <div className='bg-white rounded-2xl p-4 mt-4 mb-4'>
            <div className='flex flex-col items-center gap-4'>
                <span>🔍</span>
                <input type="text" placeholder="Поиск..." className="flex-1 w-full p-4 h-18 border-2 border-gray-300 rounded-md 
  focus:border-blue-500 focus:outline-none transition-colors duration-300"
                    value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                {inputValue !== '' && (
                    <button className='bg-gray-200 pl-2 pr-2 border-2 border-transparent rounded-2xl text-gray-600 font-semibold cursor-pointer transition-all duration-300 
    hover:bg-blue-500 hover:text-white hover:border-blue-500' onClick={() => setInputValue('')}>X</button>
                )}
            </div>
        </div>
    )
})