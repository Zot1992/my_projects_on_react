import React, { useState } from 'react'

const FilteredList = () => {
    const items = ['React', 'Vue', 'Angular', 'Svelte', 'Ember'];
    // Добавьте состояние для поиска

    const [find, setFind] = useState('');

    // Отфильтруйте items

    const filteredItems = items.filter(el =>
        el.toLowerCase().includes(find.toLowerCase())  //Метод toLowerCase() делает поиск нечувствительным к регистру. Используем includes() для проверки наличия подстроки.
    );

    console.log(filteredItems);

    return (
        <div>
            {/* Input для поиска и список результатов */}
            <input type="text" placeholder='Введите название для поиска' value={find} onChange={(e) => setFind(e.target.value)} />
            <ul> {
                filteredItems.map(el => (
                    <li key={el}>{el}</li>
                ))}
            </ul>
        </div>
    );
};

export default FilteredList