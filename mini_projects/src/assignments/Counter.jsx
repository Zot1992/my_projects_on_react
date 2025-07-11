import React, { useState } from 'react'

const Counter = () => {
    // Шаг 1: Создайте состояние count с начальным значением 0
    const [count, setCount] = useState(0);


    return (
        <div>
            {/* Шаг 2: Отобразите текущее значение count */}
            <p>Счётчик:{count}</p>

            {/* Шаг 3: Создайте кнопку, которая увеличивает count на 1 */}
            <button onClick={() => setCount(c => c + 1)}>Увеличить</button>
        </div>
    );
};


export default Counter;