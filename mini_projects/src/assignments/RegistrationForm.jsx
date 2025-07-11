import React, { useState } from 'react'

const RegistrationForm = () => {
    // Используйте объект для хранения данных формы

    const [formFields, setformFields] = useState({
        username: '',
        password: '',
        email: ''
    });

    let check = null;

    const checkData = () => {
        if (formFields.username !== '' && formFields.password !== '' && formFields.email !== '' && formFields.username.length > 3 && formFields.email.includes('@')) {
            return (check = true, console.log(check), console.log('Форма отправлена!'))
        }

        return (check = false, console.log(check), console.log('Форма не отправлена!'))
    }


    const handleSubmit = (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        checkData();
    };

    return (
        <div>
            {/* Создайте форму с тремя полями */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Имя:</label>
                <input type="text" id='username' placeholder='Введите имя' value={formFields.username} onChange={(e) => setformFields({ ...formFields, username: e.target.value })} />
                <label htmlFor="password">Пороль:</label>
                <input type="text" id='password' placeholder='Введите пороль' value={formFields.password} onChange={(e) => setformFields({ ...formFields, password: e.target.value })} />
                <label htmlFor="email">email:</label>
                <input type="text" id='email' placeholder='Введите email' value={formFields.email} onChange={(e) => setformFields({ ...formFields, email: e.target.value })} />
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};

export default RegistrationForm