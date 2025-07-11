import React, { useState } from 'react'

const TextInput = () => {
    // Создайте состояние для текста
    const [inputValue, setInputValue] = useState('');



    return (
        <div>
            {/* Создайте input и отображение текста */}
            <input type="text" placeholder='Введите текст' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <p>{inputValue}</p>
        </div>
    );
};

export default TextInput