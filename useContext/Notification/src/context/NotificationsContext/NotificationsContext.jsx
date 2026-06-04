import { createContext, useEffect, useState } from "react";

export const NotificationsContext = createContext();

export function NotificationsProvider({ children }) {

    const [arrNotifications, setArrNotifications] = useState(() => {

        const save = localStorage.getItem('notifications');

        if (save) {
            try {
                return JSON.parse(save)
            } catch {
                return []
            }
        }

        return []
    });

    useEffect(() => {
        localStorage.setItem('notifications', JSON.stringify(arrNotifications));
    }, [arrNotifications])

    const addNotification = (text) => {

        const newNotification = {
            id: crypto.randomUUID(),
            text: text
        }

        setArrNotifications([...arrNotifications, newNotification]);
    }

    const removeNotification = (id) => {
        if (arrNotifications.length !== 0) setArrNotifications(arrNotifications.filter(not => not.id !== id));
    }

    return (
        <NotificationsContext.Provider value={{ arrNotifications, addNotification, removeNotification }}>
            {children}
        </NotificationsContext.Provider>
    )
}