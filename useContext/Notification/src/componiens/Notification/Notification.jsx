import styles from '../Notification/Notification.module.css'
import { NotificationsContext } from '../../context/NotificationsContext/NotificationsContext'
import { useContext } from 'react'

export default function Notification({ not }) {

    const { removeNotification } = useContext(NotificationsContext);

    return (
        <article className={styles.notification}>
            <button className={styles.close} onClick={() => removeNotification(not.id)}>x</button>
            <p>{not.text}</p>
        </article>
    )
}