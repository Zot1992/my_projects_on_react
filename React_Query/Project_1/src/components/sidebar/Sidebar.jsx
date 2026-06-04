import { NavLink, Link } from "react-router";
import styles from '../sidebar/Sidebar.module.css'

export const Sidebar = () => {

    const setActive = ({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link;

    return (
        <aside className={styles.sidebar}>

            <div className={styles.sidebar_container}>

                <Link to='/' className={styles.logo}>Logo</Link>

                <ul className={styles.sidebar_menu}>

                    <li className={styles.item}>
                        <NavLink className={setActive} to='/dashboard' end>Dashboard</NavLink>
                    </li>

                    <li className={styles.item}>
                        <NavLink className={setActive} to='/dashboard/categories' end>Категории</NavLink>
                        <NavLink className={setActive} to='/dashboard/categories/create' end>Создать категорию</NavLink>
                    </li>

                    <li className={styles.item}>
                        <NavLink className={setActive} to='/dashboard/articles' end>Статьи</NavLink>
                        <NavLink className={setActive} to='/dashboard/articles/create' end>Создать статью</NavLink>
                    </li>

                </ul>

            </div>

        </aside>
    )
}