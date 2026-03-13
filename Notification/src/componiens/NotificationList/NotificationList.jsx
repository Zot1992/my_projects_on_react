import styles from '../NotificationList/NotificationList.module.css'
import Notification from '../Notification/Notification'
import { NotificationsContext } from '../../context/NotificationsContext/NotificationsContext'
import { useContext, useEffect } from 'react'


export default function NotificationList() {

    const { arrNotifications } = useContext(NotificationsContext);

    useEffect(() => {
        console.log(arrNotifications)
    }, [arrNotifications])

    return (
        <div className={styles.notifications}>
            {Array.isArray(arrNotifications) && (
                arrNotifications.map(not => (
                    <Notification key={not.id} not={not} />
                ))
            )}

        </div>
    )
}