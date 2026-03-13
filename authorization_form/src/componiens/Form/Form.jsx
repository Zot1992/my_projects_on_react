import { useReducer } from 'react'
import initialState, { formReducer } from '../../store/form-store';


export default function Form() {

    const [state, dispatch] = useReducer(formReducer, initialState);

    let timer;

    const handleSubmit = (e) => {
        e.preventDefault();

        clearTimeout(timer);

        if (!state.login) {
            dispatch({ type: 'ERROR', error: 'Введите логин!' });
            return
        }

        if (!state.password) {
            dispatch({ type: 'ERROR', error: 'Введите пароль!' });
            return
        }

        dispatch({ type: 'SUBMIT' });


        timer = setTimeout(() => {
            if (state.login !== 'admin') dispatch({ type: 'ERROR', error: 'Логин неверный!' })
            if (state.password !== '111') dispatch({ type: 'ERROR', error: 'Пароль неверный!' })

            if (state.login === 'admin' && state.password === '111') dispatch({ type: 'SUCCESS' })

        }, 500);
    }

    return (
        <form className='wrapper' onSubmit={handleSubmit}>
            {!state.isSuccess && (<div className='container col'>
                <h2>Авторизация</h2>
                <input type="text" value={state.login} placeholder='Логин' onChange={(e) => dispatch({
                    type: 'SET_FIELD',
                    field: 'login',
                    value: e.target.value
                })} />
                <input type="text" value={state.password} placeholder='Пароль' onChange={(e) => dispatch({
                    type: 'SET_FIELD',
                    field: 'password',
                    value: e.target.value
                })} />
                <button type='submit' disabled={state.isLoading}>{state.isLoading ? '...Загрузка' : 'Войти'}</button>
                {state.error && <p className='error'>{state.error}</p>}
                <p>Для входа в систему используйте
                    логин: admin, пароль: 111</p>
            </div>)}

            {state.isSuccess && (<div className='container'>
                <h2>Вы успешно авторизованы!</h2>
            </div>)}
        </form>
    )
}