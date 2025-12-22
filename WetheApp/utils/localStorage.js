const HISTORY_KEY = 'weather_search_history';
const UNITS_KEY = 'weather_units';

export const getUnits = () => localStorage.getItem(UNITS_KEY) || 'celsius';

export const setUnits = (units) => localStorage.setItem(UNITS_KEY, units);

export const getSearchHistory = () => {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
}

export const addSearchHistory = (city) => {
    const history = getSearchHistory().filter(item => item !== city) //Получаем историю из localCtorage и убираем фильтром тот город, который ввели, чтобы избежать дубликатов.
    const newHistory = [city, ...history].slice(0, 5); //Создаем новый массив который ограничен до 5 элементов, в котором первый элемент новый город, а остальные это раскрытый старый массив.
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
}

export const removeFromSearchHistory = (city) => {
    const newHistory = getSearchHistory().filter(item => item !== city); //Убираем из localCtorage тот город, который хотим удалить.
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
}