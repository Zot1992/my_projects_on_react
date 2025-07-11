import React, { useState, useEffect } from 'react'

const DataLoader = () => {
    // Создайте состояния для loading и data

    const [loading, setLoading] = useState('Загрузка...');
    const [data, setData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setLoading('Данные загружены!');
            setData(d => d = [{
                name: 'Сергей',
                surName: 'Спасский'
            }, {
                name: 'Сергей',
                surName: 'Нохрин'
            }])
        }, 2000);
    }, [])


    // data.length — это условие, которое проверяется. Если оно истинно (true), то результатом выражения будет <div>Имя: {data.name}</div>, и этот компонент будет отображен.
    return (
        <div>
            {loading}
            {data.length > 0 && (
                <>
                    {data[0].name && <p>Имя: {data[0].name}</p>}
                    {data[0].surName && <p>Фамилия: {data[0].surName}</p>}
                    {data[1].name && <p>Имя: {data[1].name}</p>}
                    {data[1].surName && <p>Фамилия: {data[1].surName}</p>}
                </>
            )}
        </div>
    );
};

export default DataLoader;