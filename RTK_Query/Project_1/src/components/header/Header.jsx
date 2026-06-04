import { NavLink } from "react-router";
import styles from '../header/Header.module.css'

export const Header = ({ }) => {

    const setActive = ({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link;

    return (
        <header className={styles.header}>
            <div className={styles.header_container}>
                <a className={styles.logo} href="https://first-code.ru/">Logo</a>

                <ul className={styles.menu}>
                    <li className={styles.item}>
                        <NavLink className={setActive} to="/">Главная</NavLink>
                    </li>

                    <li className={styles.item}>
                        <NavLink className={setActive} to="/articles">Статьи</NavLink>
                    </li>

                    <li className={styles.item}>
                        <NavLink className={setActive} to="/we">О нас</NavLink>
                    </li>

                    <li className={styles.item}>
                        <NavLink className={setActive} to="/dashboard">Dashboard</NavLink>
                    </li>
                </ul>
            </div>
        </header>
    )
}