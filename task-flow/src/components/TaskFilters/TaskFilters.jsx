import Select from 'react-select'
import { employees } from '../../data/employees'

const TaskFilters = ({ filters, onFiltersChange }) => {

    const filterStats = [ //Опции для селектра по статуса
        { value: 'all', label: 'Все задачи' },
        { value: 'new', label: 'Новая' },
        { value: 'in_progress', label: 'В работе' },
        { value: 'completed', label: 'Выполнена' }
    ]

    const filterExecutors = [ //Опции для селектра по исполнителям
        { value: null, label: 'Все исполнители' },
        ...employees.map(emp => ({ value: emp.id, label: emp.name })) //Убирем созданный массив(т.е убираем квадраные скобки и результат сразу попадает в основной массив filterExecutors), который получем через map. 
    ]

    const handleStatusChange = (selectedValue) => { //Смена статуса
        onFiltersChange({ ...filters, status: selectedValue.value })
    }

    const handleExecutorChange = (selectedValue) => { //Смена исполнителя
        onFiltersChange({ ...filters, employeeId: selectedValue.value })
    }

    return (
        <div className='mb-5 mt-5 flex flex-col justify-center sm:flex-row'>
            <Select className='mr-0 mb-1 sm:mr-2 sm:mb-0'
                options={filterStats}
                value={filters.status}
                onChange={handleStatusChange}
                placeholder="Статус задачи"
            />
            <Select className='mt-1 sm:ml-2 sm:mt-0'
                options={filterExecutors}
                value={filters.executor}
                onChange={handleExecutorChange}
                placeholder="Исполнитель"
            />
        </div>
    )
}

export default TaskFilters