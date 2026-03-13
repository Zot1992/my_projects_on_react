const initialState = {
    count: 0,
    text: null
}

export function countReducer(state, action) {

    let newCount;
    let newText;

    switch (action.type) {

        case 'INCREMENT':
            newCount = state.count + 1;
            newText = newCount >= 4 ? 'Продолжаем, Вперед!' : null
            return {
                count: newCount,
                text: newText
            }


        case 'DECREMENT':
            newCount = state.count - 1;
            newText = newCount <= -1 ? 'Пошли в минус!' : null
            return {
                count: newCount,
                text: newText
            }

        case 'RESET':
            return {
                count: 0,
                text: null
            }

        default:
            return {
                state
            }
    }
}

export default initialState