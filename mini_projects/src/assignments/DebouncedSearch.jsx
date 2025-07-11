import React, { useState, useEffect } from 'react'

const DebouncedSearch = () => {
    // Состояния для query и results

    const [query, setQuery] = useState('');
    const [results, setResults] = useState('');

    // useEffect с дебаунсом

    useEffect(() => {
        const timeoutId = setTimeout(() => { setResults(preResult => preResult = query.trim()) }, 500);
        return () => clearTimeout(timeoutId) //Отменяет предыдущий Timeout
    }, [query])

    return (
        <div>
            {/* Поле поиска и результаты */}
            <input type="text" placeholder='Введите данные для поиска' value={query} onChange={(e) => setQuery(e.target.value)} />
            <p>{results}</p>
        </div>
    );
};

export default DebouncedSearch