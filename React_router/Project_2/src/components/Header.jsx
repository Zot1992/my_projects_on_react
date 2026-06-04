import styles from '../components/Header.module.css'
import { NavLink } from "react-router";

export const Header = ({ }) => {
    return (
        <header className={styles.header}>

            <div className={styles.header_container}>

                <ul className={styles.menu}>

                    <li className={styles.item}>
                        <NavLink to="/" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Главная</NavLink>  {/*isActive - это параметр, который автоматически передается функции className (и style) компонентом NavLink из библиотеки react-router. */}
                    </li>

                    <li className={styles.item}>
                        <NavLink to="/programming-languages" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Языки программирования</NavLink>
                    </li>

                    <li className={styles.item}>
                        <NavLink to="/rating" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Рейтинг</NavLink>
                    </li>

                </ul>

            </div>

        </header>
    )
}