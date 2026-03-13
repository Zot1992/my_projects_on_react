const initialState = {
    login: '',        // значение поля логина
    password: '',     // значение поля пароля
    isLoading: false, // флаг загрузки
    isSuccess: false, // флаг успешной авторизации
    error: null,      // текст ошибки (или null, если ошибки нет)
}

export function formReducer(state, action) {

    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                [action.field]: action.value
            }

        case 'SUBMIT':
            return {
                ...state,
                isLoading: true,
                error: null
            }

        case 'ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.error
            }

        case 'SUCCESS':
            return {
                ...state,
                isSuccess: true,
            }

        default:
            return state
    }
}

export default initialState