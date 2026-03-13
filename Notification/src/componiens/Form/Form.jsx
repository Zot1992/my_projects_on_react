import styles from '../Form/Form.module.css'
import { useState, useContext } from 'react'
import { NotificationsContext } from '../../context/NotificationsContext/NotificationsContext'

export default function Form() {

    const [inpValue, setInpValue] = useState('');

    const { addNotification } = useContext(NotificationsContext);

    const sending = () => {
        let text;

        if (inpValue !== '') {
            text = `Привет ${inpValue}`
        } else {
            text = 'Введите имя!'
        }

        addNotification(text);
        setInpValue('');
    }

    return (
        <main className='container col'>

            <h1>Приветствие</h1>

            <form className='row'>
                <input type="text" value={inpValue} onChange={(e) => setInpValue(e.target.value)} placeholder='Введите имя' />
                <button type='button' className='button' onClick={() => sending()}>Отправить</button>
            </form>
        </main>

    )
}