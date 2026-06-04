import { Outlet } from "react-router"
import { Sidebar } from "./sidebar/Sidebar"
import styles from '../components/Admin.module.css'



export const Admin = () => {

    return (
        <div className={styles.dashboard}>
            <Sidebar />

            <Outlet />
        </div>
    )
}