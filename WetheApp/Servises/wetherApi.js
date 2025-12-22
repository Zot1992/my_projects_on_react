const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getCurrentWethe(city) {  //Получаем данные за текущую погоду
    try {
        const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`;
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Город не найден.')
            }

            throw new Error('Ошибка при загрузке данных.')
        }

        const data = await response.json();
        return data
    }
    catch (error) {
        throw error;
    }
}

export async function getCallfiveDays(city) { //Получаем данные о погоде за 5 дней
    try {
        const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Город не найден.')
            }

            throw new Error('Ошибка при загрузке данных.')
        }

        const data = await response.json();
        const delyforecast = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5);
        return delyforecast
    }
    catch (error) {
        throw error;
    }
}