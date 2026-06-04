import styles from '../Header/Header.module.css'
import { NotificationsContext } from '../../context/NotificationsContext/NotificationsContext'
import { useContext } from 'react';

export default function Header() {

    const { addNotification } = useContext(NotificationsContext);

    const date = new Date();
    const formattedDate = date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <header className={styles.header}>
            <div className={styles.header_container}>
                <button className='button' onClick={() => addNotification(`Сегодня: ${formattedDate}`)}>Узнать текущую дату</button>
            </div>

        </header>
    )
}