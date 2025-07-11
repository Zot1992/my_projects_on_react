import React, { useState, useEffect } from 'react'

const PersistentCounter = () => {
    // Загрузка и сохранение в localStorage

    const [counter, setCounter] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        // Загрузка данных из localStorage при монтировании компонента
        const storedCounter = JSON.parse(localStorage.getItem('counter'));
        console.log('Stored counter:', storedCounter);

        if (storedCounter !== null) { // так если написать просто storedCounter, то если значение будет 0 значит будет false и значение сбрасывается до того которое есть по умолчанию
            setCounter(parseInt(storedCounter)); // parseInt нужен для того что бы строку преобразовать число, так как localStorage работает только со строками
        }
    }, []);

    useEffect(() => {
        // Сохранение данных в localStorage при изменении состояния counter
        localStorage.setItem('counter', JSON.stringify(counter));
    }, [counter]);

    useEffect(() => {
        if (!isRunning) return; // Таймер не запущен

        const intervalId = setInterval(() => { setCounter((prev) => prev + 1); }, 1000); //Пока isRunning не будет false мы так и будем находиться в этой функции и обход кода не пойдет дальше
        // Если в setCounter писать ++prev, то значение изменяется только на экране,а в localStorage все так же остается 0
        return () => clearInterval(intervalId); // Очистка при остановке или размонтировании
    }, [isRunning]);

    const start = () => setIsRunning(true);
    const stop = () => setIsRunning(false);

    const checkButton = () => (!isRunning) ? start() : stop()
    const reset = () => setCounter((prev) => prev = 0)

    return (
        <div>
            {/* Счётчик с кнопками */}
            <p>{counter}</p>
            <button onClick={checkButton}>{isRunning ? "Стоп" : "Старт"}</button>
            <button onClick={reset}>Сброс</button>
        </div>
    );
};

export default PersistentCounter;