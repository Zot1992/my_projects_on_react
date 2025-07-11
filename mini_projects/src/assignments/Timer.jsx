import React, { useState, useEffect } from 'react'

const Timer = () => {
    // Используйте useState и useEffect

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCounter(prevCount => prevCount + 1);
        }, 1000);

        // Очистка интервала при размонтировании компонента
        return () => clearInterval(intervalId);
    }, []); // Пустой массив зависимостей, чтобы запустить эффект только один раз при монтировании


    return (
        <div>
            <p>Прошло секунд: {counter}</p>
        </div>
    );
};

export default Timer