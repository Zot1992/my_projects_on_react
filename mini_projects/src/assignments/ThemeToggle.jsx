import React, { useState } from 'react'

const ThemeToggle = () => {
    // Создайте состояние для темы
    const [theme, setTheme] = useState('light');

    const shiftTheme = () => {
        let newTheme = theme === 'light' ? 'dark' : 'light';

        setTheme(newTheme);

        if (theme === 'light') {
            document.body.style.backgroundColor = 'black';
            document.body.style.color = '#ffffff';
            console.log(theme);
        }
        else if (theme === 'dark') {
            document.body.style.backgroundColor = '#ffffff';
            document.body.style.color = 'black';
            console.log(theme);

        }
    }

    return (
        <div>
            {/* Отобразите текущую тему и кнопку переключения */}
            <p>{theme}</p>
            <button onClick={shiftTheme}>Переключить тему</button>
        </div>
    );
};

export default ThemeToggle;