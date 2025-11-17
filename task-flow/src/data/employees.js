export const employees = [
    {
        id: 1,
        name: 'Флексей Алексеев'
    },
    {
        id: 2,
        name: 'Иван Иванов'
    },
    {
        id: 3,
        name: 'Роман Иванов'
    },
    {
        id: 4,
        name: 'Евгений Иванов'
    },
    {
        id: 5,
        name: 'Рустам Иванов'
    },
]

export const taskStatuses = {
    NEW: 'new',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed'
}

export const statusLaebols = {  //В квадратных скобках это вычисляемое значение.
    [taskStatuses.NEW]: 'Новое',
    [taskStatuses.IN_PROGRESS]: 'В процессе',
    [taskStatuses.COMPLETED]: 'Выполнено'
}

export const statusPrioretis = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high'
}

export const statusPrioretisLaebols = {
    [statusPrioretis.LOW]: 'Низкий',
    [statusPrioretis.MEDIUM]: 'Средний',
    [statusPrioretis.HIGH]: 'Высокий'
}

export const statusName = {
    [statusPrioretis.LOW]: 'bg-green-100 text-green-800 border-green-300',
    [statusPrioretis.MEDIUM]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    [statusPrioretis.HIGH]: 'bg-red-100 text-red-800 border-red-300'
}





