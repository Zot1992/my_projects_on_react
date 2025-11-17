import Select from 'react-select'
import { employees, statusName, taskStatuses, statusLaebols } from "../../data/employees"

const TaskCard = ({ task = [], onEdit, onDelete, onStatusChange }) => {

    const status = statusName[task.priority] || 'bg-gray-100'; //Получаем значение из task.priority либо ставим значение по умолчанию
    const findUser = employees.find(item => item.id === task.employeeId) || { name: 'Не назначен' }; //Поиск исполнителя

    const data = (task) => task.createdAt.slice(0, 10).split("").reverse().join(""); //Вырезаем ненужное что бы получить только число месяц и год
    const result = data(task).split('-').map(part => part.split('').reverse().join('')).join('-'); //Переворачиваем что бы была правильная последовательность даты

    const optionStats = Object.keys(taskStatuses).map(key => ({ //Опции для селектра статуса
        value: taskStatuses[key],
        label: statusLaebols[taskStatuses[key]]
    }));


    const handleOnDelete = (task) => { //Удаление задачи
        if (confirm("Вы уверены, что хотите удалить эту карточку?")) {
            return onDelete(task.id)
        }
        return
    }

    return (
        <div className="p-4 bg-white flex flex-col shadow-sm">
            <div className={status}>
                <h2 className="text-2xl p-2 break-words">{task.title}</h2>
                <p className='p-2 break-words'>{task.description}</p>
                <div key={findUser.key} className="font-bold text-blue-700">{findUser.name}</div>
                <p className='break-words p-2'>{result}</p>
                <div>
                    <Select
                        options={optionStats}
                        value={optionStats.find(option => option.value === task.status)}
                        onChange={(selectedOption) => onStatusChange(task.id, selectedOption.value)}
                        placeholder="Статус"
                    />
                </div>
                <div>
                    <button className='mx-2 mb-1 mt-2  p-2 rounded-2xl cursor-pointer  text-white  bg-blue-600 hover:bg-blue-400 xxs:mb-2'
                        onClick={() => onEdit(task)}>Редактировать</button>
                    <button className='mx-2 mt-1  p-2 rounded-2xl cursor-pointer  text-white  bg-blue-600 hover:bg-blue-400 xxs:mt-2 mb-2'
                        onClick={() => handleOnDelete(task)}>Удалить</button>
                </div>
            </div>
        </div >
    )
}

export default TaskCard