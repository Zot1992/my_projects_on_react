import { useState, useEffect } from "react";
import Select from 'react-select'
import { employees, statusPrioretis, statusPrioretisLaebols } from "../../data/employees";

const TaskForm = ({ editingTask = null, onSubmit, onCancel }) => {

    const [formData, setFormData] = useState({ //Состояние формы
        title: '',
        description: '',
        employeeId: '',
        priority: 'medium'
    });

    const [errors, setErrors] = useState({}); //Состояние ошибок

    const optionPrioretis = Object.keys(statusPrioretis).map(key => ({ //Опции для селектра приоритетов
        value: statusPrioretis[key],
        label: statusPrioretisLaebols[statusPrioretis[key]]
    }));

    const optionEmployee = employees.map(emp => ({ //Опции для селектра исполнителей
        value: emp.id,
        label: emp.name
    }));

    useEffect(() => {
        editingTask !== null
            ? setFormData({
                title: editingTask.title,
                description: editingTask.description,
                employeeId: editingTask.employeeId,
                priority: editingTask.priority
            }) : setFormData({
                title: '',
                description: '',
                employeeId: '',
                priority: 'medium'
            })
    }, [editingTask]) //Если задача есть то она заполняет форму, а если ее нет то форма очищается.

    const checkValidate = () => { //Проверка на валидность
        const newErrors = {};

        if (!formData.title || formData.title.length < 3) {
            newErrors.title = 'Название должно быть не менее 3 символов';
        }

        if (!formData.employeeId) {
            newErrors.employeeId = 'Необходимо выбрать сотрудника';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e) => { //Функция по отправке задачи и очищение формы
        e.preventDefault();

        if (!checkValidate()) {
            return
        }

        onSubmit(formData);

        setFormData({
            title: '',
            description: '',
            employeeId: '',
            priority: 'medium'
        })
    }

    const handleChangeEmployee = (selectedOption) => { //Смена исполнителя с ошибкой если ничего не выбрано
        if (!selectedOption) {
            setFormData({ ...formData, employeeId: '' });
            setErrors({ employeeId: 'Пожалуйста, выберите исполнителя.' });
            return;
        }

        setFormData({ ...formData, employeeId: selectedOption.value });
        setErrors({});
    }

    const handleChangePriority = (selectedOption) => { //Смена приоритета с ошибкой если ничего не выбрано
        if (!selectedOption) {
            setFormData({ ...formData, priority: '' });
            setErrors({ priority: 'Пожалуйста, выберите приоритет.' });
            return;
        }

        setFormData({ ...formData, priority: selectedOption.value });
        setErrors({});
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 bg-white shadow-md rounded-md dark:bg-gray-800 max-w-lg mx-auto"
        >
            <div className="space-y-6">
                <div className="mb-4">
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Название задачи"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white resize-y leading-6 placeholder:italic placeholder:opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white resize-y h-32 leading-6 placeholder:italic placeholder:opacity-50"
                        placeholder="Описание задачи..."
                    />
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-6">
                    <div className="w-full sm:w-1/2">
                        <Select
                            options={optionEmployee}
                            value={optionEmployee.find(option => option.value === formData.employeeId)}
                            onChange={handleChangeEmployee}
                            placeholder="Исполнитель"
                            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        />
                    </div>

                    <div className="w-full sm:w-1/2">
                        <Select
                            options={optionPrioretis}
                            value={optionPrioretis.find(option => option.value === formData.priority)}
                            onChange={handleChangePriority}
                            placeholder="Приоритет"
                            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        />
                    </div>
                </div>

                {Object.keys(errors).length > 0 && (
                    <div className="bg-red-50 p-4 rounded-md mt-4">
                        <p className="text-red-800 font-medium">
                            Пожалуйста, исправьте ошибки:
                        </p>
                        <ul className="list-disc pl-6 text-red-700">
                            {Object.values(errors).map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className=" mt-6">
                    <button type="submit" className="m-2 p-3 rounded-2xl cursor-pointer  text-white  bg-blue-600 hover:bg-blue-400"
                    >{editingTask !== null ? 'Сохранить изменения' : 'Добавить задачу'}</button>

                    {editingTask !== null && (
                        <button className="m-2 p-3 rounded-2xl cursor-pointer  text-white  bg-blue-600 hover:bg-blue-400"
                            onClick={() => onCancel()}>Отмена</button>)}
                </div>
            </div>
        </form>
    )
}

export default TaskForm